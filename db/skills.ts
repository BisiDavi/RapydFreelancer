export async function createSkillDB(client: any, data: any) {
  return await client
    .db("rapyd-freelancer")
    .collection("skills")
    .insertOne(data)
}

export async function getSkillsDB(client: any) {
  return await client
    .db("rapyd-freelancer")
    .collection("skills")
    .find({})
    .toArray();
}
