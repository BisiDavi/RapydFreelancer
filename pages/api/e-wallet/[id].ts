import { NextApiRequest, NextApiResponse } from "next";
import { DBClient } from "@/db/DBConnection";
import { updateDataDB } from "@/db";
import makeRequest from "@/request/makeRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wallet } = req.body;
  const { id, userData }: any = req.query;
  const parsedUserData = JSON.parse(userData);

  switch (req.method) {
    //get e-wallet
    case "GET": {
      try {
        const dbClient = await DBClient();
        const getWallet: any = await makeRequest("get", `/v1/user/${id}`);
        console.log("getWallet", getWallet?.body.data);
        if (getWallet?.body.data) {
          await updateDataDB(
            dbClient,
            "users",
            { email: getWallet?.body.data.contacts.data[0].email },
            {
              $set: {
                ...parsedUserData,
                ewallet: getWallet?.body.data.id,
                accounts: getWallet?.body.data.accounts,
              },
            }
          )
            .then((response) => console.log("db-response", response))
            .catch((error) => console.log("db-error", error));
        }
        return res.status(200).send(getWallet?.body.data);
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
