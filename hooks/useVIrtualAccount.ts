import { useRef } from "react";

import useToast from "@/hooks/useToast";
import { issueVirtualAccount } from "@/request/postRequest";

export default function useVIrtualAccount() {
  const { updateToast, loadingToast } = useToast();
  const toastId = useRef(null);

  function applyForVirtualAccount(data: { [key: string]: string | any }) {
    loadingToast(toastId);
    return issueVirtualAccount(data)
      .then((response) => {
        updateToast(toastId, "success", "Bank Account created successfully");
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
        updateToast(
          toastId,
          "error",
          `Error creating Bank Account, ${error?.status?.response_code}`
        );
      });
  }

  return { applyForVirtualAccount };
}
