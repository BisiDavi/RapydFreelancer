import countryCurrency from "@/json/countrycurrency.json";
import { v4 as  uuidv4 } from "uuid";

type dataType = {
  amount: number;
  currency: string;
};

export function getConnectPaymentData(data: dataType) {
  const country = countryCurrency.filter(
    (item) => item.currency === data.currency
  )[0].countryCode;
  const fxData =
    data.currency !== "USD"
      ? { fixed_side: "buy", requested_currency: "USD" }
      : { requested_currency: "USD" };

  const paymentData = {
    ...fxData,
    amount: data.amount,
    country,
    complete_payment_url: "h",
    currency: data.currency,
    language: "en",
    merchant_reference_id: uuidv4(),
    metadata: {
      merchant_defined: true,
    },
  };

  return paymentData;
}
