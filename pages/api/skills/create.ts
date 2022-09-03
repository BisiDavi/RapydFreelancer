// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import firebaseDB from "@/lib/firebaseDB";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { skill, skillId } = req.body;
  switch (req.method) {
    case "POST": {
      const { writeData } = firebaseDB();
      const data = { skill, id: skillId };
      writeData(JSON.stringify(data), `/skills/${skillId}`)
        .then(() => {
          res.status(200).json({ status: "skill created" });
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  }
}
