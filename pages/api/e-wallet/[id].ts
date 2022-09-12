import { NextApiRequest, NextApiResponse } from "next";
import makeRequest from "@/request/makeRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wallet } = req.body;
  const { id }: any = req.query;

  switch (req.method) {
    //get e-wallet
    case "GET": {
      try {
        const getWallet: any = await makeRequest("get", `/v1/user/${id}`);
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
