import { useQueryClient } from "@tanstack/react-query";

import useRequestMutation from "@/hooks/useRequestMutation";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateSidebar } from "@/redux/ui-slice";
import { updateUserProfile } from "@/redux/user-slice";
import useAuthModal from "@/hooks/useAuthModal";

export default function useAuthMutation() {
  const { authSignup, authSignIn, authSignOut } = useAuth();
  const { modal, toggleModal } = useAuthModal();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  function closeSidebar() {
    dispatch(updateSidebar(null));
  }

  function useSignupMutation() {
    return useRequestMutation(
      ({ userData, password }) => authSignup(userData, password),
      {
        mutationKey: ["useSignupMutation"],
        success: "Sign up Successful",
        error: "Sign up error",
        onSuccessMethod: () => {
          if (modal === "auth-modal") {
            toggleModal(null);
          }
          closeSidebar();
        },
      }
    );
  }

  function useSigninMutation() {
    return useRequestMutation(
      ({ email, password }) => authSignIn(email, password),
      {
        mutationKey: ["useSigninMutation"],
        success: "Sign in successful",
        error: "oops, an error occured",
        onSuccessMethod() {
          if (modal === "auth-modal") {
            queryClient.invalidateQueries(["getUserProfile"]);
            toggleModal(null);
          }
          return closeSidebar();
        },
      }
    );
  }

  function useSignoutMutation() {
    return useRequestMutation(authSignOut, {
      mutationKey: ["useSignoutMutation"],
      success: "logout successful",
      error: "oops, an error occured",
      onSuccessMethod: () => {
        dispatch(updateUserProfile(null));
      },
    });
  }

  return { useSignupMutation, useSigninMutation, useSignoutMutation };
}
