import { useQueryClient } from "@tanstack/react-query";

import { useAppSelector } from "@/hooks/useRedux";
import { useAppDispatch } from "@/redux/store";
import useRequestMutation from "@/hooks/useRequestMutation";
import { updateProfileForm } from "@/redux/form-slice";
import { updateUserProfile, updateWallet } from "@/redux/user-slice";
import { createWallet } from "@/request/postRequest";

export default function useWalletMutation() {
  const { profile } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  function useCreateWalletMutation(resetForm: () => void) {
    return useRequestMutation((userData) => createWallet(userData, profile), {
      mutationKey: ["useWalletMutation"],
      success: "KYC submitted, wallet created successfully",
      error: "Oops, unable to create wallet due to an error",
      onSuccessMethodWithData: (data) => {
        dispatch(updateUserProfile(null));
        queryClient.invalidateQueries(["getUserProfile"]);
        console.log("data-onSuccessMethodWithData", data);
        dispatch(updateProfileForm());
        dispatch(updateWallet(data.id));
        resetForm();
      },
    });
  }

  return { useCreateWalletMutation };
}
