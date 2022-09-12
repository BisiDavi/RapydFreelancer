import axios from "axios";
import { useRef } from "react";

import { useAppSelector } from "@/hooks/useRedux";
import { formatWalletData } from "@/lib/rapyd-data";
import useToast from "@/hooks/useToast";

export default function useProfileForm() {
  const { profile } = useAppSelector((state) => state.user);
  const { loadingToast, updateToast } = useToast();
  const toastId = useRef(null);

  function createWallet(userData: { [key: string]: string }) {
    const userDetails = { ...userData, ...profile };
    const walletData = formatWalletData(userDetails);
    console.log("userDetails", userDetails);
    console.log("walletData", walletData);
    loadingToast(toastId);
    return axios
      .post("/api/e-wallet", { data: walletData })
      .then((response) => {
        console.log("response-wallet", response);
        updateToast(
          toastId,
          "success",
          "KYC submitted, wallet created successfully"
        );
      })
      .catch((err) => {
        console.log("error", err);
        updateToast(toastId, "error", err?.status?.response_code);
      });
  }

  return { createWallet };
}
