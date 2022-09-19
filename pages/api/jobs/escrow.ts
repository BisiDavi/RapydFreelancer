import connectDB from "@/db/DBConnection";
import { updateDataDB } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, query } = req.body;

  switch (req.method) {
    // create job
    case "POST": {
      try {
        const dbClient = await connectDB();
        await updateDataDB(
          dbClient,
          "users",
          { email: query.email },
          { $push: { hires: data } }
        );
        const response = await updateDataDB(
          dbClient,
          "jobs",
          { id: query.id },
          { $push: { hired: data }, $set: { paid: true, active: false } }
        );
        return res.status(200).send(response.data);
      } catch (err) {
        console.log("post-error", err);
        return res.status(400).send(err);
      }
    }
  }
}
