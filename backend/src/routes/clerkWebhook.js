import express from "express";
import { Webhook } from "svix";
import { inngest } from "../lib/inngest.js";

const router = express.Router();

// Clerk requires RAW body
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;

    try {
      evt = wh.verify(payload, headers);
    } catch (err) {
      console.error("❌ Clerk webhook verification failed:", err);
      return res.status(400).send("Invalid signature");
    }

    console.log("✅ Clerk Event Received:", evt.type);

    // Forward event to Inngest
    if (evt.type === "user.created") {
      await inngest.send({
        name: "clerk.user.created",
        data: evt.data,
      });
    }

    if (evt.type === "user.deleted") {
      await inngest.send({
        name: "clerk.user.deleted",
        data: evt.data,
      });
    }

    res.status(200).json({ success: true });
  },
);

export default router;
