import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import clerkWebhook from "./routes/clerkWebhook.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();

app.use("/api/clerk/webhook", express.raw({ type: "*/*" }));

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhook);

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/chat", chatRoutes);

app.use("/api/session", sessionRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success from abnsh API" });
});

app.get("/books", (req, res) => {
  req.auth;
  res.status(200).json({ message: "books bro books" });
});

//When you pass an array of middleware to express, it automatically flattens that and executes them sequentially, one by one. In this case it'll first run requireAuth() and then async function {Both are in protectRoute.js}. After this if its successfull the next() will run and in the end 'message' gets appeared.
app.get("/video", protectRoute, (req, res) => {
  res.status(200).json({
    message: "Video call route is workin and this is a protected Route",
  });
});

app.get("/food", protectRoute, (req, res) => {
  res.status(200).json({ message: "Place your order; This is a food route" });
});

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || ENV.PORT || 5000;

    app.listen(PORT, () => {
      console.log("Server is running on port:", PORT);
    });
  } catch (error) {
    console.error("Error while starting the server", error);
  }
};

startServer();
