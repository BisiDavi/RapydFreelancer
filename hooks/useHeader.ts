/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";

import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useScroll from "@/hooks/useScroll";
import { updateSidebar } from "@/redux/ui-slice";
import { UIStateType } from "@/types/redux-types";
import useAuthMutation from "@/hooks/useAuthMutation";
import { getUserProfile } from "@/request/getRequest";
import { updateUserProfile } from "@/redux/user-slice";

export default function useHeader() {
  const { scroll } = useScroll();
  const dispatch = useAppDispatch();
  const { authDetails } = useAuth();
  const { useSignoutMutation } = useAuthMutation();
  const { mutate } = useSignoutMutation();
  const { messages, profile } = useAppSelector((state) => state.user);
  const { sidebar } = useAppSelector((state) => state.UI);
  const auth: any = authDetails();
  useQuery(["getUserProfile"], () => getUserProfile(auth?.email), {
    enabled: !!auth?.email && profile === null,
    onSuccess(data) {
      if (!profile) {
        dispatch(updateUserProfile(data?.data[0]));
      }
    },
  });

  const unreadMessages = messages.filter((item) => !item?.read).length;

  function signoutHandler() {
    return mutate({});
  }

  const headerClassname = scroll > 80 ? "fixed top-0" : "";

  function authHandler(authValue: UIStateType["sidebar"]) {
    dispatch(updateSidebar(authValue));
  }

  return {
    authHandler,
    auth,
    signoutHandler,
    profile,
    unreadMessages,
    headerClassname,
    sidebar,
  };
}
