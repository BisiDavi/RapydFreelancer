import axios from "axios";
import { useRef } from "react";

import { useAppSelector } from "@/hooks/useRedux";
import { formatWalletData } from "@/lib/rapyd-data";
import useToast from "@/hooks/useToast";
import { useAppDispatch } from "@/redux/store";
import { updateProfileForm } from "@/redux/form-slice";
import { updateWallet } from "@/redux/user-slice";
import useWalletMutation from "@/hooks/useWalletMutation";

export default function useProfileForm() {
  const { profile } = useAppSelector((state) => state.user);
  const { loadingToast, updateToast } = useToast();
  const toastId = useRef(null);
  const dispatch = useAppDispatch();
  const { useCreateWalletMutation } = useWalletMutation();

  function createWallet(
    userData: { [key: string]: string },
    resetForm: () => void
  ) {
    const userDetails = { ...userData, ...profile };
    const walletData = formatWalletData(userDetails);
    loadingToast(toastId);
    return axios
      .post("/api/e-wallet", {
        data: walletData,
        userData,
      })
      .then((response) => {
        console.log("response-wallet", response);
        dispatch(updateProfileForm());
        dispatch(updateWallet(response.data.id));
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

  return { createWallet, useCreateWalletMutation };
}
