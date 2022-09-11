import type { MongoClient } from "mongodb";

export async function saveToDB(
  client: MongoClient | any,
  collection: string,
  data: any
) {
  return await client
    .db("rapyd-freelancer")
    .collection(collection)
    .insertOne(data);
}

export async function getDataDB(client: any, collection: string, query?: any) {
  console.log("query", query);
  const dbQuery = query ? query : {};
  return await client
    .db("rapyd-freelancer")
    .collection(collection)
    .find(dbQuery)
    .toArray();
}

export async function deleteDataDB(
  client: any,
  collection: string,
  data: { [key: string]: string }
) {
  return await client
    .db("rapyd-freelancer")
    .collection(collection)
    .deleteOne(data);
}
