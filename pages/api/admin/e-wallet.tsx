import { v4 as uuidv4 } from "uuid";

import { NextApiRequest, NextApiResponse } from "next";
import { DBClient } from "@/db/DBConnection";
import { saveToDB } from "@/db/saveToDB";
import makeRequest from "@/request/makeRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    //create e-wallet
    case "POST": {
      try {
        const dbClient = await DBClient();
        const data = {
          first_name: "Olubisi",
          last_name: "David",
          business_details: {
            entity_type: "company",
            name: "RapydFreelancers Marketplace",
            registration_number: "12345678904",
            industry_category: "company",
            industry_sub_category: "freelancer hiring",
            address: {
              name: "Olubisi David",
              line_1: "No 23, Oonicrownland Estate",
              line_2: "",
              line_3: "",
              state: "Osun State",
              city: "Ile-Ife",
              country: "NG",
              phone_number: "+2347031653411",
              zip: "220005",
              metadata: {
                merchant_defined: true,
              },
            },
          },
          email: "oludavidconnect@gmail.com",
          ewallet_reference_id: uuidv4(),
          metadata: {
            business_owner: true,
            merchant_defined: true,
          },
          type: "company",
        };
        return await makeRequest("post", "/v1/user", data).then((response) => {
          console.log("response", response);
          return res.status(200).send(response);
          // if (response.data) {
          //   await saveToDB(dbClient, "wallet-admin", result)
          //     .then((response) => console.log("db-response", response))
          //     .catch((error) => console.log("db-error", error));
          // }
        });
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
    case "GET": {
      try {
        return await makeRequest("get", "/v1/user/wallets").then((response) => {
          console.log("response", response);
          return res.status(200).send(response);
        });
      } catch (error: any) {
        console.log("error-data-response", error);
        return res.status(400).send(error);
      }
    }
  }
}
