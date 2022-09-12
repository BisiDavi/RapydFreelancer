import axios from "axios";
import { useRef } from "react";

import { useAppSelector } from "@/hooks/useRedux";
import { formatWalletData } from "@/lib/rapyd-data";
import useToast from "@/hooks/useToast";
import { useAppDispatch } from "@/redux/store";
import { updateProfileForm } from "@/redux/form-slice";

export default function useProfileForm() {
  const { profile } = useAppSelector((state) => state.user);
  const { loadingToast, updateToast } = useToast();
  const toastId = useRef(null);
  const dispatch = useAppDispatch();

  function createWallet(
    userData: { [key: string]: string },
    resetForm: () => void
  ) {
    const userDetails = { ...userData, ...profile };
    const walletData = formatWalletData(userDetails);
    loadingToast(toastId);
    return axios
      .post("/api/e-wallet", { data: walletData })
      .then((response) => {
        console.log("response-wallet", response);
        dispatch(updateProfileForm());
        resetForm();
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
