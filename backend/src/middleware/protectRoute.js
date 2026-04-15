import User from "../models/user.model.js";
import { upsertStreamUser } from "../lib/stream.js";
import { clerkClient } from "@clerk/express";

const CLERK_ID_LIKE = /^user_[a-zA-Z0-9]+$/;
const STREAM_UPSERT_TTL_MS = 1000 * 60 * 15;

// Deduplicate concurrent sync work for the same Clerk user during initial page fan-out.
const userSyncInFlight = new Map();
const streamUpsertLastRunByClerkId = new Map();

function pickPrimaryEmailFromClerkUser(clerkUser) {
  const primaryFromObject =
    clerkUser?.primaryEmailAddress?.emailAddress ||
    clerkUser?.primary_email_address?.email_address;
  if (primaryFromObject) return primaryFromObject;

  const emailList =
    clerkUser?.emailAddresses || clerkUser?.email_addresses || [];
  const primaryId =
    clerkUser?.primaryEmailAddressId || clerkUser?.primary_email_address_id;

  if (primaryId) {
    const primary = emailList.find((emailEntry) => {
      const id = emailEntry?.id;
      return id === primaryId;
    });

    const primaryEmail = primary?.emailAddress || primary?.email_address;
    if (primaryEmail) return primaryEmail;
  }

  return emailList[0]?.emailAddress || emailList[0]?.email_address || "";
}

function pickDisplayName({ clerkUser, claimsName, existingName, email }) {
  const firstName = clerkUser?.firstName || clerkUser?.first_name || "";
  const lastName = clerkUser?.lastName || clerkUser?.last_name || "";
  const clerkFullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  const clerkUsername = clerkUser?.username || clerkUser?.user_name || "";
  const cleanExistingName = (existingName || "").trim();
  const emailPrefix = email?.split("@")[0]?.trim() || "";

  return (
    claimsName ||
    clerkFullName ||
    clerkUsername ||
    (!CLERK_ID_LIKE.test(cleanExistingName) ? cleanExistingName : "") ||
    emailPrefix ||
    "User"
  );
}

function shouldRunStreamUpsert(clerkId, shouldForceSync = false) {
  if (shouldForceSync) {
    streamUpsertLastRunByClerkId.set(clerkId, Date.now());
    return true;
  }

  const lastRunAt = streamUpsertLastRunByClerkId.get(clerkId) || 0;
  const isExpired = Date.now() - lastRunAt > STREAM_UPSERT_TTL_MS;

  if (isExpired) {
    streamUpsertLastRunByClerkId.set(clerkId, Date.now());
  }

  return isExpired;
}

async function syncUserForRequest({ clerkId, auth }) {
  const claims = auth.sessionClaims || {};
  const derivedEmail =
    claims.email || claims.email_address || claims.primary_email_address;
  const claimsName =
    claims.full_name ||
    [claims.first_name, claims.last_name].filter(Boolean).join(" ") ||
    claims.username ||
    "";
  const derivedProfileImage =
    claims.image_url || claims.picture || claims.profile_image_url || "";

  const existingUser = await User.findOne({ clerkId });

  let clerkUser = null;
  const shouldFetchClerkProfile =
    !claimsName.trim() ||
    CLERK_ID_LIKE.test(claimsName.trim()) ||
    CLERK_ID_LIKE.test((existingUser?.name || "").trim());

  if (shouldFetchClerkProfile) {
    try {
      clerkUser = await clerkClient.users.getUser(clerkId);
    } catch (error) {
      console.warn("Unable to fetch Clerk profile for user sync", error);
    }
  }

  const clerkEmail = pickPrimaryEmailFromClerkUser(clerkUser);
  const resolvedEmail =
    derivedEmail ||
    clerkEmail ||
    existingUser?.email ||
    `${clerkId}@clerk.local`;

  const resolvedName = pickDisplayName({
    clerkUser,
    claimsName: claimsName.trim(),
    existingName: existingUser?.name,
    email: resolvedEmail,
  });
  const resolvedProfileImage =
    derivedProfileImage ||
    clerkUser?.imageUrl ||
    clerkUser?.image_url ||
    existingUser?.profileImage ||
    "";

  const needsUserWrite =
    !existingUser ||
    existingUser.name !== resolvedName ||
    existingUser.email !== resolvedEmail ||
    (existingUser.profileImage || "") !== resolvedProfileImage;

  const user = needsUserWrite
    ? await User.findOneAndUpdate(
        { clerkId },
        {
          $set: {
            name: resolvedName,
            email: resolvedEmail,
            profileImage: resolvedProfileImage,
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      )
    : existingUser;

  return {
    user,
    shouldUpsertStream: shouldRunStreamUpsert(clerkId, needsUserWrite),
  };
}

export const protectRoute = async (req, res, next) => {
  try {
    const auth = req.auth();
    const clerkId = auth.userId;

    if (!clerkId) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }

    let syncPromise = userSyncInFlight.get(clerkId);
    if (!syncPromise) {
      syncPromise = syncUserForRequest({ clerkId, auth }).finally(() => {
        userSyncInFlight.delete(clerkId);
      });
      userSyncInFlight.set(clerkId, syncPromise);
    }

    const { user, shouldUpsertStream } = await syncPromise;

    // attach user to req
    req.user = user;

    // Run stream sync without blocking request latency.
    if (shouldUpsertStream) {
      void upsertStreamUser({
        id: user.clerkId,
        name: user.name,
        image: user.profileImage || "",
      });
    }

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
