import { createJobsDB, getJobsDB } from "@/db/jobs";
import connectDB from "@/middleware/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { job } = req.body;
  const date = new Date();
  const jobData = { ...job, createdAt: date };

  switch (req.method) {
    // create job
    case "POST": {
      try {
        const dbClient = await connectDB();
        return await createJobsDB(dbClient, jobData)
          .then(() => {
            return res.status(200).send("job created");
          })
          .catch((error) => {
            console.log("error", error);
            return res.status(400).send("job not created");
          });
      } catch (err) {
        console.log("post-error", err);
        return res.status(400).json(err);
      }
    }
    // get jobs
    case "GET": {
      const { query }: any = req.query;
      const parsedQuery = query ? JSON.parse(query) : null;
      try {
        const dbClient = await connectDB();
        return await getJobsDB(dbClient, parsedQuery)
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
