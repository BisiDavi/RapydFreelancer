import { updateDataDB } from "@/db";
import { DBClient } from "@/db/DBConnection";
import { bidMessageToFreelancer, bidMessageToRecruiter } from "@/lib/messages";
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
        const updateUser = await updateDataDB(
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
        const sendFreelancerMessage = await updateDataDB(
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
        const sendRecruiterMessage = await updateDataDB(
          dbClient,
          "users",
          { email: data.recruiter.email },
          {
            $set: {
              messages: [recruiterMessage],
            },
          }
        );
        console.log("updateUser", updateUser);
        console.log("updateBid", updateBid);
        console.log("sendFreelancerMessage", sendFreelancerMessage);
        console.log("sendRecruiterMessage", sendRecruiterMessage);
        return res.status(200).send(updateBid);
      } catch (error) {
        console.log("error");
        return res.status(400).send(error);
      }
    }
  }
}
