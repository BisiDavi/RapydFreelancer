import useRequestMutation from "@/hooks/useRequestMutation";
import { connectPayment } from "@/request/postRequest";
import {
  getCurrencyDailyRate,
  getPaymentByCountry,
  getPaymentFields,
} from "@/request/getRequest";
import { useMutation } from "@tanstack/react-query";

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

  function usePaymentByMethod() {
    return useRequestMutation(
      ({ country, currency }) => getPaymentByCountry(country, currency),
      {
        mutationKey: ["usePaymentByMethod"],
        success: "Payment by country fetched",
      }
    );
  }

  function usePaymentRequiredFields() {
    return useMutation((type: string) => getPaymentFields(type), {
      mutationKey: ["usePaymentRequiredFields"],
    });
  }

  return {
    useGetCurrencyRate,
    useConnectPaymentMutation,
    useFundWalletMutation,
    usePaymentByMethod,
    usePaymentRequiredFields,
  };
}
