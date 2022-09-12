import { NextApiRequest, NextApiResponse } from "next";
import { DBClient } from "@/db/DBConnection";
import { saveToDB } from "@/db";
import makeRequest from "@/request/makeRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wallet, data } = req.body;

  console.log("wallet", wallet);

  switch (req.method) {
    //create e-wallet
    case "POST": {
      try {
        const dbClient = await DBClient();
        const createWalletResponse: any = await makeRequest(
          "post",
          "/v1/user",
          data
        );

        console.log("createWalletResponse", createWalletResponse);

        if (createWalletResponse.data) {
          await saveToDB(dbClient, "wallet", createWalletResponse.data)
            .then((response) => console.log("db-response", response))
            .catch((error) => console.log("db-error", error));
        }
        return res.status(200).send(createWalletResponse);
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
    case "GET": {
      try {
        return await makeRequest("get", "/v1/user/wallets").then((response) => {
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
        return await makeRequest("delete", `/v1/user/${wallet}/`).then(
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
