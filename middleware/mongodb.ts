import { MongoClient } from "mongodb";

export default async function connectDB() {
  const url = `${process.env.NEXT_PUBLIC_MONGODB_URI}`;
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server");
    return client;
  } finally {
    await client.close();
  }
}
