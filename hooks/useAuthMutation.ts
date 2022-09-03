import useRequestMutation from "@/hooks/useRequestMutation";
import useAuth from "@/hooks/useAuth";

export default function useAuthMutation() {
  const { authSignup, authSignIn, authSignOut } = useAuth();

  function useSignupMutation() {
    return useRequestMutation(
      ({ email, password, firstName, lastName }) =>
        authSignup(email, password, firstName, lastName),
      {
        mutationKey: ["useSignupMutation"],
        success: "Sign up Successful",
        error: "Sign up error",
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
      }
    );
  }

  function useSignoutMutation() {
    return useRequestMutation(authSignOut, {
      mutationKey: ["useSignoutMutation"],
      success: "logout successful",
      error: "oops, an error occured",
    });
  }

  return { useSignupMutation, useSigninMutation, useSignoutMutation };
}
