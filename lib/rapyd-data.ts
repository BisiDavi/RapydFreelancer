import { v4 as uuidv4 } from "uuid";

export function formatWalletData(data: any) {
  const {
    name,
    email,
    country,
    state,
    city,
    address,
    phonenumber,
    zip,
    dateOfBirth,
  } = data;
  const formatName = name.split(" ");
  return {
    first_name: formatName[0],
    last_name: formatName[1],
    ewallet_reference_id: uuidv4(),
    phone_number: phonenumber,
    email: email,
    metadata: {
      merchant_defined: true,
    },
    type: "person",
    contact: {
      phone_number: phonenumber,
      email: email,
      first_name: formatName[0],
      last_name: formatName[1],
      mothers_name: "",
      contact_type: "personal",
      address: {
        name,
        line_1: address,
        line_2: "",
        line_3: "",
        city,
        state,
        country,
        zip,
        phone_number: phonenumber,
        metadata: {},
        canton: "",
        district: "",
      },
      identification_type: "DL",
      identification_number: "1234567890",
      date_of_birth: dateOfBirth,
      country,
      nationality: country,
      metadata: {
        merchant_defined: true,
      },
    },
  };
}
