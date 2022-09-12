import useRequestMutation from "@/hooks/useRequestMutation";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateSidebar } from "@/redux/ui-slice";
import { updateUserProfile } from "@/redux/user-slice";

export default function useAuthMutation() {
  const { authSignup, authSignIn, authSignOut } = useAuth();
  const dispatch = useAppDispatch();

  function closeSidebar() {
    dispatch(updateSidebar(null));
  }

  function useSignupMutation() {
    return useRequestMutation((data) => authSignup(data), {
      mutationKey: ["useSignupMutation"],
      success: "Sign up Successful",
      error: "Sign up error",
      onSuccessMethod: () => closeSidebar(),
    });
  }

  function useSigninMutation() {
    return useRequestMutation(
      ({ email, password }) => authSignIn(email, password),
      {
        mutationKey: ["useSigninMutation"],
        success: "Sign in successful",
        error: "oops, an error occured",
        onSuccessMethod() {
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
