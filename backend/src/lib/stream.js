import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;

const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY OR STREAM_API_SECRET Missing");
}
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //This is for chat features

export const streamClient = new StreamClient(apiKey, apiSecret); //This is for video calls

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream User upserted Successfully", userData);
  } catch (error) {
    console.error("Error upserting Stream User", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser([userId]);
    console.log("Stream User Deleted Successfully", userId);
  } catch (error) {
    console.error("Error Deleting Stream User", error);
  }
};
