import { useQueryClient } from "@tanstack/react-query";

import { useAppDispatch } from "@/redux/store";
import useRequestMutation from "@/hooks/useRequestMutation";
import { updateProfileForm } from "@/redux/form-slice";
import { updateUserProfile, updateWallet } from "@/redux/user-slice";
import { createWallet } from "@/request/postRequest";
import useAuth from "@/hooks/useAuth";

export default function useWalletMutation() {
  const dispatch = useAppDispatch();
  const { authDetails } = useAuth();
  const auth = authDetails()?.providerData[0];

  const queryClient = useQueryClient();

  function useCreateWalletMutation(resetForm: () => void) {
    return useRequestMutation(
      (userData) =>
        createWallet(userData, { name: auth?.displayName, email: auth?.email }),
      {
        mutationKey: ["useWalletMutation"],
        success: "KYC submitted, wallet created successfully",
        onSuccessMethodWithData: (data) => {
          dispatch(updateUserProfile(null));
          queryClient.invalidateQueries(["getUserProfile"]);
          console.log("data-onSuccessMethodWithData", data);
          dispatch(updateProfileForm());
          dispatch(updateWallet(data.id));
          resetForm();
        },
      }
    );
  }

  return { useCreateWalletMutation };
}
