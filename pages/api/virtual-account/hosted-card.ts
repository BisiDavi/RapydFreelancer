import { NextApiRequest, NextApiResponse } from "next";

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
        const issueCardRequest: any = await makeRequest(
          "post",
          "/v1/hosted/issuing/activate_card",
          data
        );

        console.log("issueCardRequest", issueCardRequest);

        return res.status(200).send(issueCardRequest?.body.data);
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
  }
}
