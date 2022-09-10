import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import rapydRequest from "@/request/rapydRequest";
import { NextApiRequest, NextApiResponse } from "next";
import { DBClient } from "@/db/DBConnection";
import { saveToDB } from "@/db/saveToDB";

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
          email: "oludavidconnect@gmail.com",
          ewallet_reference_id: uuidv4(),
          metadata: {
            business_owner: true,
          },
          phone_number: "+2347031653411",
          type: "company",
          contact: {
            address: {
              name: "Olubisi David",
              line_1: "No 23, Oonicrownland Estate",
              line_2: "",
              line_3: "",
              canton: "No 23, Oonicrownland Estate",
              district: "Oonicrownlad Estate",
              state: "Osun State",
              city: "Ile-Ife",
              country: "NG",
              phone_number: "+2347031653411",
              zip: "220005",
              metadata: {
                merchant_defined: true,
              },
            },
            contact_type: "business",
            gender: "male",
            house_type: "leease",
            marital_status: "single",
            send_notifications: true,
            phone_number: "+2347031653411",
            email: "oludavidconnect@gmail.com",
            first_name: "Olubisi",
            second_last_name: "",
            last_name: "David",
            mothers_name: "Ojoniyi Foluke",
            identification_type: "PA",
            identification_number: "1234567890",
            date_of_birth: "10/08/1996",
            country: "NG",
            nationality: "NG",
            business_details: {
              address: {
                name: "Olubisi David",
                line_1: "No 23, Oonicrownland Estate",
                line_2: "",
                line_3: "",
                canton: "No 23, Oonicrownland Estate",
                district: "Oonicrownlad Estate",
                state: "Osun State",
                city: "Ile-Ife",
                country: "NG",
                phone_number: "+2347031653411",
                zip: "220005",
                metadata: {
                  merchant_defined: true,
                },
              },
              annual_revenue: 10000,
              entity_type: "company",
              establishment_date: "2022/08/01",
              industry_category: "company",
              industry_sub_category: "freelancer hiring",
              name: "RapydFreelancers Marketplace",
              registration_number: "1234567890",
            },
          },
        };
        const stringifedData = JSON.stringify(data);
        const resultData: any = rapydRequest(
          "/v1/user",
          "post",
          stringifedData
        );
        console.log("resultData", resultData);
        const result = await axios(resultData);
        console.log("result", result?.data);
        if (result.data) {
          await saveToDB(dbClient, "wallet-admin", result)
            .then((response) => console.log("db-response", response))
            .catch((error) => console.log("db-error", error));
        }
        return res.status(200).send(result);
      } catch (error: any) {
        console.log("error", error?.message);
        return res.status(400).send(error);
      }
    }
    case "GET": {
    }
  }
}
