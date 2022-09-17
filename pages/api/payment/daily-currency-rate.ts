import { NextApiRequest, NextApiResponse } from "next";
import makeRequest from "@/request/makeRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { buyCurrency }: any = req.query;

  switch (req.method) {
    //get raypd daily ratet
    case "GET": {
      try {
        const getDailyRate: any = await makeRequest(
          "get",
          `/v1/rates/daily?action_type=payment&buy_currency=${buyCurrency}&sell_currency=USD`
        );
        return res.status(200).send(getDailyRate?.body.data);
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
  }
}
