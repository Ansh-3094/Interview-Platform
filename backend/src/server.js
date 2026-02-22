import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
const app = express();
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Success from API" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "books bro books" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("Server is running on port:", ENV.PORT);
    });
  } catch (error) {
    console.error("Error while starting the server");
  }
};

startServer();
