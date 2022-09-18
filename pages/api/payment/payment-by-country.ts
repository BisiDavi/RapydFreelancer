import { NextApiRequest, NextApiResponse } from "next";
import makeRequest from "@/request/makeRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { country, currency }: any = req.query;

  console.log("country-api", country);
  console.log("currency-api", currency);

  switch (req.method) {
    //make payment
    case "GET": {
      try {
        const paymentByCountryResponse: any = await makeRequest(
          "get",
          `/v1/payment_methods/country?country=${country}&currency=${currency}`
        );
        console.log("paymentByCountryResponse", paymentByCountryResponse);
        return res.status(200).send(paymentByCountryResponse?.body.data);
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
  }
}
 