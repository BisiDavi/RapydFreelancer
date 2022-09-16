import { MongoClient } from "mongodb";

export default async function connectDB() {
  try {
    const url = `${process.env.NEXT_PUBLIC_MONGODB_URI}`;
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected successfully to server");
    return client;
  } catch (e) {
    console.error("db-error", e);
  }
}
