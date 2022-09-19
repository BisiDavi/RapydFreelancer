import useRequestMutation from "@/hooks/useRequestMutation";
import { connectPayment } from "@/request/postRequest";

export default function useEscrowMutation() {
  return useRequestMutation((data) => connectPayment(data), {
    mutationKey: ["useConnectPaymentMutation"],
    success: "Redirecting you to Raypd payment gateway",
  });
}
