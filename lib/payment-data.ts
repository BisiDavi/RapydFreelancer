import { v4 as uuidv4 } from "uuid";

import countryCurrency from "@/json/countrycurrency.json";

type dataType = {
  amount: number;
  currency: string;
  connectQuantity: number;
  currencyType: string;
};

export function getConnectPaymentData(data: dataType) {
  console.log("data-data", data);
  const country =
    data.currencyType === "USD"
      ? "US"
      : countryCurrency.filter((item) => item.currency === data.currency)[0]
          .countryCode;
  const currency = data.currencyType ? data.currencyType : data.currency;
  const fxData =
    currency !== "USD"
      ? { fixed_side: "buy", requested_currency: "USD" }
      : { requested_currency: "USD" };
  const paymentData = {
    ...fxData,
    amount: data.amount,
    country,
    cancel_checkout_url: "https://rapyd-freelancer.vercel.app/user/account",
    complete_checkout_url:
      "https://rapyd-freelancer.vercel.app/payment/connect/success",
    complete_payment_url:
      "https://rapyd-freelancer.vercel.app/payment/connect/success",
    error_payment_url:
      "https://rapyd-freelancer.vercel.app/payment/connect/error",
    currency,
    language: "en",
    merchant_reference_id: uuidv4(),
    metadata: {
      merchant_defined: true,
      connectQuantity: data.connectQuantity,
    },
  };

  console.log("paymentData", paymentData);

  return paymentData;
}
