import axios from "axios";

import useRequestMutation from "@/hooks/useRequestMutation";

export function getCurrencyDailyRate(buyCurrency: string) {
  return axios.get("/api/payment/daily-currency-rate", {
    params: { buyCurrency },
  });
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

  return { useGetCurrencyRate };
}
