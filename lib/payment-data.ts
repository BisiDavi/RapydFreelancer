import { v4 as uuidv4 } from "uuid";

type dataType = {
  amount: number;
  currency: string;
  connectQuantity: number;
  currencyType: string;
  country: string;
};

export function getConnectPaymentData(data: dataType) {
  console.log("data-data", data);
  const country = data.country;
  const currency =
    data.currencyType === "USD" ? data.currencyType : data.currency;
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

  return paymentData;
}

type fundWalletPaymentDataType = {
  ewallet: string;
  amount: number;
  currency: string;
  country: string;
};

export function fundWalletPaymentData(data: fundWalletPaymentDataType) {
  const paymentData = {
    amount: data.amount,
    country: "US",
    cancel_checkout_url: "https://rapyd-freelancer.vercel.app/user/account",
    complete_checkout_url:
      "https://rapyd-freelancer.vercel.app/payment/connect/success",
    complete_payment_url:
      "https://rapyd-freelancer.vercel.app/payment/connect/success",
    error_payment_url:
      "https://rapyd-freelancer.vercel.app/payment/connect/error",
    currency: data.currency,
    ewallet: data.ewallet,
    language: "en",
    merchant_reference_id: uuidv4(),
    metadata: {
      merchant_defined: true,
    },
  };

  return paymentData;
}

export function getPaymentData(
  dataObj: any,
  link: "connect" | "fund-wallet" | "job"
) {
  console.log("data-dataObj", dataObj);
  const fxData =
    dataObj.currency !== "USD"
      ? { fixed_side: "buy", requested_currency: "USD" }
      : { requested_currency: "USD" };

  const paymentData = {
    ...fxData,
    ...dataObj,
    cancel_checkout_url: "https://rapyd-freelancer.vercel.app/user/account",
    complete_checkout_url: `https://rapyd-freelancer.vercel.app/payment/${link}/success`,
    complete_payment_url: `https://rapyd-freelancer.vercel.app/payment/${link}/success`,
    error_payment_url: `https://rapyd-freelancer.vercel.app/payment/${link}/error`,
    language: "en",
    merchant_reference_id: uuidv4(),
    metadata: {
      merchant_defined: true,
    },
  };

  return paymentData;
}
