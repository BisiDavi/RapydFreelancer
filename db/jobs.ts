export async function createJobsDB(client: any, data: any) {
  return await client.db("rapyd-freelancer").collection("jobs").insertOne(data);
}

export async function getJobsDB(client: any, query?: any) {
  const dbQuery = query ? query : {};
  return await client
    .db("rapyd-freelancer")
    .collection("jobs")
    .find(dbQuery)
    .toArray();
}
