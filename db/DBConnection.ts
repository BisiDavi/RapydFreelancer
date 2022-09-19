import { MongoClient } from "mongodb";

export default async function connectDB() {
  let client;
  let clientPromise: Promise<MongoClient>;
  const url = `${process.env.NEXT_PUBLIC_MONGODB_URI}`;

  try {
    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      if (!global._mongoClientPromise) {
        client = new MongoClient(url);
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      // In production mode, it's best to not use a global variable.
      client = new MongoClient(url);
      clientPromise = client.connect();
    }
    console.log("Connected successfully to server");
    return clientPromise;
  } catch (e) {
    console.error("db-error", e);
  }
}
