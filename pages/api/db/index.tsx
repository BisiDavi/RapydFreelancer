import { NextApiRequest, NextApiResponse } from "next";
import { deleteDataDB, getDataDB, saveToDB, updateDataDB } from "@/db";
import connectDB from "@/db/DBConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collection, data } = req.body;

  switch (req.method) {
    case "POST": {
      try {
        const dbClient = await connectDB();
        await saveToDB(dbClient, collection, data).then((response) => {
          return res.status(200).send(response);
        });
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
    case "GET": {
      const { collection, query, projection }: any = req.query;
      const parsedQuery = query ? JSON.parse(query) : "";
      const parsedprojection = projection ? JSON.parse(projection) : "";

      try {
        const dbClient = await connectDB();
        return await getDataDB(
          dbClient,
          collection,
          parsedQuery,
          parsedprojection
        ).then((response) => {
          console.log("response", response);
          return res.status(200).send(response);
        });
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
    case "PUT": {
      const dbClient = await connectDB();
      const { query } = req.body;
      try {
        return await updateDataDB(dbClient, collection, query, data).then(
          (response) => {
            console.log("response", response);
            return res.status(200).send(response);
          }
        );
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
    case "DELETE": {
      try {
        const dbClient = await connectDB();
        return await deleteDataDB(dbClient, collection, data).then(
          (response) => {
            console.log("response", response);
            return res.status(200).send(response);
          }
        );
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
  }
}
