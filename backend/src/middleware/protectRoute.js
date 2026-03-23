import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const auth = req.auth();
    const clerkId = auth.userId;

    if (!clerkId) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }

    const claims = auth.sessionClaims || {};
    const derivedEmail =
      claims.email ||
      claims.email_address ||
      claims.primary_email_address ||
      `${clerkId}@clerk.local`;
    const derivedName =
      claims.full_name ||
      [claims.first_name, claims.last_name].filter(Boolean).join(" ") ||
      claims.username ||
      derivedEmail.split("@")[0] ||
      "User";
    const derivedProfileImage =
      claims.image_url || claims.picture || claims.profile_image_url || "";

    // Ensure a DB user exists for this authenticated Clerk user.
    const user = await User.findOneAndUpdate(
      { clerkId },
      {
        $set: {
          name: derivedName,
          email: derivedEmail,
          profileImage: derivedProfileImage,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    // attach user to req
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
