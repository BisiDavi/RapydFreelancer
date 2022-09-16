import { updateDataDB } from "@/db";
import connectDB from "@/db/DBConnection";
import { bidMessageToFreelancer, bidMessageToRecruiter } from "@/lib/messages";
import type { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id }: any = req.query;
  const { data } = req.body;
  switch (req.method) {
    case "POST": {
      try {
        const dbClient = await connectDB();
        const updateBid = await updateDataDB(
          dbClient,
          "jobs",
          { id },
          {
            $set: { bids: [data] },
          }
        );
        await updateDataDB(
          dbClient,
          "users",
          { email: data.freelancer.email },
          {
            $set: {
              bids: [
                {
                  id,
                  title: data?.title,
                  price: data.price,
                  createdAt: data?.createdAt,
                },
              ],
            },
          }
        );
        const freelancerMessage = await bidMessageToFreelancer(data);
        await updateDataDB(
          dbClient,
          "users",
          { email: data.freelancer.email },
          {
            $set: {
              messages: [freelancerMessage],
            },
          }
        );
        const recruiterMessage = await bidMessageToRecruiter(data);
        await updateDataDB(
          dbClient,
          "users",
          { email: data.recruiter.email },
          {
            $set: {
              messages: [recruiterMessage],
            },
          }
        );
        return res.status(200).send(updateBid);
      } catch (error) {
        console.log("error");
        return res.status(400).send(error);
      }
    }
  }
}
