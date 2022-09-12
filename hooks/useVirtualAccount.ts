import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import useToast from "@/hooks/useToast";
import { issueVirtualAccount } from "@/request/postRequest";
import { useAppSelector } from "@/hooks/useRedux";

export default function useVirtualAccount() {
  const { updateToast, loadingToast } = useToast();
  const { walletId } = useAppSelector((state) => state.user);
  const toastId = useRef(null);

  function applyForVirtualAccount(data: { [key: string]: string | any }) {
    loadingToast(toastId);
    const dataObj = {
      ...data,
      ewallet: walletId,
      merchant_reference_id: uuidv4(),
    };
    return issueVirtualAccount(dataObj)
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
