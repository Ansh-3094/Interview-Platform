import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "interview-platform" });

function pickPrimaryEmail(clerkUserData) {
  const emailList = clerkUserData?.email_addresses || [];
  const primaryId = clerkUserData?.primary_email_address_id;

  if (primaryId) {
    const primary = emailList.find((entry) => entry?.id === primaryId);
    const primaryEmail = primary?.email_address;
    if (primaryEmail) return primaryEmail;
  }

  return emailList[0]?.email_address || "";
}

function pickDisplayName(clerkUserData) {
  const firstName = clerkUserData?.first_name || "";
  const lastName = clerkUserData?.last_name || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  return (
    fullName ||
    clerkUserData?.username ||
    pickPrimaryEmail(clerkUserData).split("@")[0] ||
    "User"
  );
}

async function syncUserRecord(clerkUserData) {
  const clerkId = clerkUserData?.id;
  const email = pickPrimaryEmail(clerkUserData);
  const name = pickDisplayName(clerkUserData);
  const profileImage = clerkUserData?.image_url || "";

  const user = await User.findOneAndUpdate(
    { clerkId },
    {
      $set: {
        email,
        name,
        profileImage,
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );

  await upsertStreamUser({
    id: clerkId.toString(),
    name,
    image: profileImage,
  });

  return user;
}

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk.user.created" },
  async ({ event }) => {
    await connectDB();

    const user = await syncUserRecord(event.data);
    return { user };
  },
);

const syncUpdatedUser = inngest.createFunction(
  { id: "sync-updated-user" },
  { event: "clerk.user.updated" },
  async ({ event }) => {
    await connectDB();

    const user = await syncUserRecord(event.data);
    return { user };
  },
);

const deleteuserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk.user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString());
    return { deleted: true };
  },
);

export const functions = [syncUser, syncUpdatedUser, deleteuserFromDB];
