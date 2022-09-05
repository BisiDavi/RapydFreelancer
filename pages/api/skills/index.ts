import { DBClient } from "@/db/DBConnection";
import { createSkillDB, getSkillsDB } from "@/db/skills";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { skill, id } = req.body;
  const data = { label: skill, value: id };

  switch (req.method) {
    // create skill
    case "POST": {
      try {
        const dbClient = await DBClient();
        return await createSkillDB(dbClient, data)
          .then((response) => {
            console.log("database-create-skill", response);
            return res.status(200).send("skill created");
          })
          .catch((error) => {
            console.log("error", error);
            return res.status(400).send("skill not created");
          });
      } catch (err) {
        console.log("post-error", err);
        return res.status(400).json(err);
      }
    }
    // get skills
    case "GET": {
      try {
        const dbClient = await DBClient();
        return await getSkillsDB(dbClient)
          .then((response) => {
            return res.status(200).json(response);
          })
          .catch((error) => {
            return res.status(400).json(error);
          });
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  }
}
