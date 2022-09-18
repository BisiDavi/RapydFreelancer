import useRequestMutation from "@/hooks/useRequestMutation";
import { connectPayment } from "@/request/postRequest";
import { getCurrencyDailyRate } from "@/request/getRequest";

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
    });
  }

  function useFundWalletMutation() {
    return useRequestMutation((data) => connectPayment(data), {
      mutationKey: ["useFundWalletMutation"],
      success: "Redirecting you to Raypd payment gateway",
    });
  }

  return {
    useGetCurrencyRate,
    useConnectPaymentMutation,
    useFundWalletMutation,
  };
}
