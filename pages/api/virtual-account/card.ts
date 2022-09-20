import { NextApiRequest, NextApiResponse } from "next";
// import { DBClient } from "@/db/DBConnection";

import { updateDataDB } from "@/db";
import makeRequest from "@/request/makeRequest";
import connectDB from "@/db/DBConnection";

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
        const dbClient = await connectDB();
        const issueCardRequest: any = await makeRequest(
          "post",
          "/v1/issuing/cards",
          data
        );

        console.log("issueCardRequest", issueCardRequest);

        if (issueCardRequest?.body.data) {
          await updateDataDB(
            dbClient,
            "users",
            { ewallet: issueCardRequest?.body.data.ewallet_contact.ewallet },
            {
              $set: {
                card: {
                  cardId: issueCardRequest?.body.data.card_id,
                  createdAt: issueCardRequest?.body.data.created_at,
                  cardProgram: issueCardRequest?.body.data.card_program,
                  cardNumber: issueCardRequest?.body.data.card_number,
                  cvv: issueCardRequest?.body.data.cvv,
                  mm: issueCardRequest?.body.data.expiration_month,
                  yy: issueCardRequest?.body.data.expiration_year,
                },
              },
            }
          )
            .then((response) => console.log("db-response", response))
            .catch((error) => console.log("db-error", error));
        }
        return res.status(200).send(issueCardRequest?.body.data);
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
  }
}
