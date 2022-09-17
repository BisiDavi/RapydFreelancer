import { NextApiRequest, NextApiResponse } from "next";
import makeRequest from "@/request/makeRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount, buyCurrency }: any = req.query;
  const parsedAmount = JSON.parse(amount);
  const parsedBuyCurrency = JSON.parse(buyCurrency);

  switch (req.method) {
    //get raypd daily ratet
    case "GET": {
      try {
        const getDailyRate: any = await makeRequest(
          "get",
          `/v1/rates/daily?action_type=payment&amount=${parsedAmount}&buy_currency=${parsedBuyCurrency}&sell_currency=USD`
        );
        return res.status(200).send(getDailyRate?.body.data);
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
  }
}
