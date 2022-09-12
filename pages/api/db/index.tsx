import { NextApiRequest, NextApiResponse } from "next";
import { DBClient } from "@/db/DBConnection";
import { deleteDataDB, getDataDB, saveToDB, updateDataDB } from "@/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collection, data } = req.body;
  const dbClient = await DBClient();

  switch (req.method) {
    case "POST": {
      try {
        return await saveToDB(dbClient, collection, data).then((response) => {
          return res.status(200).send(response);
        });
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
    case "GET": {
      const { collection, query, projection }: any = req.query;
      const parsedQuery = JSON.parse(query);
      const parsedprojection = projection ? JSON.parse(projection) : "";

      try {
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
