import { useAppSelector } from "@/hooks/useRedux";
import { useAppDispatch } from "@/redux/store";
import useRequestMutation from "@/hooks/useRequestMutation";
import { updateProfileForm } from "@/redux/form-slice";
import { updateWallet } from "@/redux/user-slice";
import { createWallet } from "@/request/postRequest";

export default function useWalletMutation() {
  const { profile } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  function useCreateWalletMutation(resetForm: any) {
    return useRequestMutation((userData) => createWallet(userData, profile), {
      mutationKey: ["useWalletMutation"],
      success: "KYC submitted, wallet created successfully",
      error: "Oops, unable to create wallet due to an error",
      onSuccessMethodWithData: (data) => {
        console.log("data-onSuccessMethodWithData", data);
        dispatch(updateProfileForm());
        dispatch(updateWallet(data.id));
        resetForm();
      },
    });
  }

  return { useCreateWalletMutation };
}
