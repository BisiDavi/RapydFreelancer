export async function saveToDB(client: any, collection: string, data: any) {
  return await client
    .db("rapyd-freelancer")
    .collection(collection)
    .insertOne(data);
}
