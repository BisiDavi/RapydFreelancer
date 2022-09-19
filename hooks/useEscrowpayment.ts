import useRequestMutation from "@/hooks/useRequestMutation";
import { escrowPayment } from "@/request/postRequest";

export default function useEscrowMutation() {
  return useRequestMutation((data) => escrowPayment(data), {
    mutationKey: ["useEscrowMutation"],
    success: "Redirecting you to Raypd payment gateway",
  });
}
