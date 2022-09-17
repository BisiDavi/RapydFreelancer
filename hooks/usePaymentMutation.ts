import useRequestMutation from "@/hooks/useRequestMutation";
import axios from "axios";

export function getCurrencyDailyRate(amount: string, buyCurrency: string) {
  return axios.get("/api/payment/daily-currency-rate", {
    params: { amount, buyCurrency },
  });
}

export default function usePaymentMutation() {
  function useGetCurrencyRate() {
    return useRequestMutation(
      ({ amount, buyCurrency }) => getCurrencyDailyRate(amount, buyCurrency),
      {
        mutationKey: ["useGetCurrencyRate"],
        success: "currency rate fetched",
        error: "unable to fetch currency rate",
      }
    );
  }

  return { useGetCurrencyRate };
}
