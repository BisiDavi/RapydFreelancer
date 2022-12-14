// import { DBClient } from "@/db/DBConnection";
import { getDataDB } from "@/db";
import connectDB from "@/db/DBConnection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, collection } = req.body;
  switch (req.method) {
    // get jobs
    case "GET": {
      try {
        const dbClient = await connectDB();
        return await getDataDB(dbClient, collection, query)
          .then((response: any) => {
            return res.status(200).json(response);
          })
          .catch((error: any) => {
            return res.status(400).json(error);
          });
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  }
}
