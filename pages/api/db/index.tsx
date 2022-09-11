import { NextApiRequest, NextApiResponse } from "next";
import { DBClient } from "@/db/DBConnection";
import { deleteDataDB, getDataDB, saveToDB } from "@/db";

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
          console.log("response", response);
          return res.status(200).send(response);
        });
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
    case "GET": {
      const { collection, query }: any = req.query;
      console.log("req.query", req.query);

      console.log("collection, data, query ", collection, query);
      const parsedQuery = JSON.parse(query);

      console.log("parsedQuery", parsedQuery);

      try {
        return await getDataDB(dbClient, collection, parsedQuery).then(
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
