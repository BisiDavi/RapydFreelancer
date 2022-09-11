import { NextApiRequest, NextApiResponse } from "next";
import { DBClient } from "@/db/DBConnection";
import { deleteDataDB, getDataDB, saveToDB } from "@/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { collection, data } = req.body;
  console.log("req.query", req.query);
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

      console.log("collection, data, query ", collection, data, query);
      try {
        return await getDataDB(dbClient, collection, query).then((response) => {
          console.log("response", response);
          return res.status(200).send(response);
        });
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
