import dotenv from "dotenv";
dotenv.config();

import { connect } from "mongoose";

export async function connectToMongo() {
  return await connect(process.env.MONGO_URL);
}
