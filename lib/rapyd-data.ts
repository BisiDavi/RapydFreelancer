import { v4 as uuidv4 } from "uuid";

export const walletData = {
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

export function formatWalletData(name: string, email: string) {
  const formatName = name.split(" ");
  return {
    first_name: formatName[0],
    last_name: formatName[1],
    ewallet_reference_id: uuidv4(),
    metadata: {
      merchant_defined: true,
    },
    type: "person",
    contact: {
      phone_number: "+14155551234",
      email: email,
      first_name: formatName[0],
      last_name: formatName[1],
      mothers_name: "",
      contact_type: "personal",
      address: {
        name,
        line_1: "123 Main Street",
        line_2: "",
        line_3: "",
        city: "Anytown",
        state: "NY",
        country: "US",
        zip: "12345",
        phone_number: "",
        metadata: {},
        canton: "",
        district: "",
      },
      identification_type: "DL",
      identification_number: "1234567890",
      date_of_birth: "",
      country: "",
      nationality: "",
      metadata: {
        merchant_defined: true,
      },
    },
  };
}