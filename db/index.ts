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

export async function getDataDB(
  client: any,
  collection: string,
  query?: any,
  projection?: { [key: string]: string }
) {
  console.log("query", query);
  const dbQuery = query ? query : {};
  function getDB() {
    return client.db("rapyd-freelancer").collection(collection).find(dbQuery);
  }
  return projection
    ? await getDB().project(projection).toArray()
    : await getDB().toArray();
}

export async function deleteDataDB(client: any, collection: string, data: any) {
  return await client
    .db("rapyd-freelancer")
    .collection(collection)
    .deleteOne(data);
}

export async function updateDataDB(
  client: any,
  collection: string,
  query: { [key: string]: string },
  data: any
) {
  return await client
    .db("rapyd-freelancer")
    .collection(collection)
    .updateOne(query, data);
}
