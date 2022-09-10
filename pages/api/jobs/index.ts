import { DBClient } from "@/db/DBConnection";
import { createJobsDB, getJobsDB } from "@/db/jobs";
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
        const dbClient = await DBClient();
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
      try {
        const dbClient = await DBClient();
        return await getJobsDB(dbClient)
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
