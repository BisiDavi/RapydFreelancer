import { NextApiRequest, NextApiResponse } from "next";
import { DBClient } from "@/db/DBConnection";
import { updateDataDB } from "@/db";
import makeRequest from "@/request/makeRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = req.body;

  console.log("data", data);

  switch (req.method) {
    //create e-wallet
    case "POST": {
      try {
        const dbClient = await DBClient();
        const createVirtualAccountResponse: any = await makeRequest(
          "post",
          "/v1/issuing/bankaccounts",
          data
        );

        console.log(
          "createVirtualAccountResponse",
          createVirtualAccountResponse
        );

        if (createVirtualAccountResponse?.body.data) {
          await updateDataDB(
            dbClient,
            "users",
            { ewallet: createVirtualAccountResponse?.body.data.ewallet },
            {
              $set: {
                $push: {
                  account: createVirtualAccountResponse?.body.data,
                },
              },
            }
          )
            .then((response) => console.log("db-response", response))
            .catch((error) => console.log("db-error", error));
        }
        return res.status(200).send(createVirtualAccountResponse?.body.data);
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
  }
}
