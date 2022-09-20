import connectDB from "@/db/DBConnection";
import { updateDataDB } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { hiredMessage } from "@/lib/messages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, query } = req.body;
  switch (req.method) {
    // create job
    case "POST": {
      try {
        const freelancerHiredMessage = hiredMessage(data);
        const dbClient = await connectDB();
        await updateDataDB(
          dbClient,
          "users",
          { email: query.email },
          { $push: { hires: data, messages: freelancerHiredMessage } }
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
