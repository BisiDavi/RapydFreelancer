import useRequestMutation from "@/hooks/useRequestMutation";
import { escrowPayment } from "@/request/postRequest";

export default function useEscrowMutation() {
  return useRequestMutation(({ data, email }) => escrowPayment(data, email), {
    mutationKey: ["useEscrowMutation"],
    success: "Redirecting you to Raypd payment gateway",
  });
}
