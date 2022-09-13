import { updateDataDB } from "@/db";
import { DBClient } from "@/db/DBConnection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, data }: any = req.query;
  const parsedData = JSON.parse(data);

  switch (req.method) {
    case "POST": {
      try {
        const dbClient = await DBClient();
        const updateBid = await updateDataDB(
          dbClient,
          "jobs",
          { id },
          {
            $set: { bids: [parsedData] },
          }
        );
        console.log("updateBid", updateBid);
        return res.status(200).send(updateBid);
      } catch (error) {
        console.log("error");
        return res.status(400).send(error);
      }
    }
  }
}
