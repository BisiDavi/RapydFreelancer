/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";

import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useScroll from "@/hooks/useScroll";
import { updateSidebar } from "@/redux/ui-slice";
import useAuthMutation from "@/hooks/useAuthMutation";
import { getUserProfile } from "@/request/getRequest";
import { updateUserProfile } from "@/redux/user-slice";
import type { UIStateType } from "@/types/redux-types";

export default function useHeader() {
  const { scroll } = useScroll();
  const dispatch = useAppDispatch();
  const { authDetails } = useAuth();
  const { useSignoutMutation } = useAuthMutation();
  const { mutate } = useSignoutMutation();

  const { profile } = useAppSelector((state) => state.user);
  const { sidebar } = useAppSelector((state) => state.UI);
  const auth: any = authDetails();

  const userProfile = useQuery(
    ["getUserProfile"],
    () => getUserProfile(auth?.email),
    {
      staleTime: Infinity,
      onSuccess(data) {
        if (!profile && data.data.length > 0) {
          dispatch(updateUserProfile(data?.data[0]));
        }
      },
    }
  );
  const { data, status } = userProfile;

  const messages = status === "success" ? data.data[0].messages : [];

  const unreadMessages = messages.filter((item: any) => !item?.read).length;

  function signoutHandler() {
    return mutate({});
  }

  const headerClassname = scroll > 80 ? "fixed top-0" : "";

  function authHandler(authValue: UIStateType["sidebar"]) {
    dispatch(updateSidebar(authValue));
  }

  function toggleMenu() {
    if (sidebar === "mobile-sidebar") {
      dispatch(updateSidebar(null));
    } else {
      dispatch(updateSidebar("mobile-sidebar"));
    }
  }

  return {
    authHandler,
    auth,
    signoutHandler,
    profile,
    unreadMessages,
    messages,
    headerClassname,
    userProfile,
    sidebar,
    toggleMenu,
  };
}
