// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebaseDB from "@/lib/firebaseDB";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { skill, skillId } = req.body;
  const { writeData, readData } = firebaseDB();
  switch (req.method) {
    // create skill
    case "POST": {
      const data = { skill, id: skillId };
      writeData(JSON.stringify(data), `/skills/${skillId}/`)
        .then((response) => {
          console.log("response", response);
          res.status(200).send({ status: "skill created" });
        })
        .catch((error) => {
          console.log("error", error);
          res.status(400).send(error);
        });
    }
    // get skills
    case "GET": {
      let result: any = {};
      readData("/skills", result);
      const skills =
        typeof result?.data === "object" ? Object.values(result?.data) : [];
      res.status(200).send(skills);
    }
  }
}
