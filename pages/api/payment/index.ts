import { NextApiRequest, NextApiResponse } from "next";
import makeRequest from "@/request/makeRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data }: any = req.body;

  switch (req.method) {
    //make payment
    case "POST": {
      try {
        const paymentResponse: any = await makeRequest(
          "post",
          `/v1/checkout`,
          data
        );
        return res.status(200).send(paymentResponse?.body.data);
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
  }
}
