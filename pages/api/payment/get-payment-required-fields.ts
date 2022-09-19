import { NextApiRequest, NextApiResponse } from "next";
import makeRequest from "@/request/makeRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type }: any = req.query;

  switch (req.method) {
    //make payment
    case "GET": {
      try {
        const paymentResponse: any = await makeRequest(
          "get",
          `/v1/payment_methods/required_fields/${type}`
        );
        return res.status(200).send(paymentResponse?.body.data);
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
  }
}
