import axios from "axios";

import useRequestMutation from "@/hooks/useRequestMutation";

function getCurrencyDailyRate(buyCurrency: string) {
  return axios.get("/api/payment/daily-currency-rate", {
    params: { buyCurrency },
  });
}

function connectPayment(data: any) {
  return axios.post("/api/payment", { data });
}

export default function usePaymentMutation() {
  function useGetCurrencyRate() {
    return useRequestMutation(
      (buyCurrency) => getCurrencyDailyRate(buyCurrency),
      {
        mutationKey: ["useGetCurrencyRate"],
        success: "currency rate fetched",
        error: "unable to fetch currency rate",
      }
    );
  }

  function useConnectPaymentMutation() {
    return useRequestMutation((data) => connectPayment(data), {
      mutationKey: ["useConnectPaymentMutation"],
      success: "Redirecting you to Raypd payment gateway",
      error: "unable to process payment for connect",
    });
  }

  return { useGetCurrencyRate, useConnectPaymentMutation };
}
