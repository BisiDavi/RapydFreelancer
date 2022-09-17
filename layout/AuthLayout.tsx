/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useRedux";
import useAuthModal from "@/hooks/useAuthModal";
import { updateModal } from "@/redux/ui-slice";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { authDetails } = useAuth();
  const auth = authDetails();
  const { modal, toggleModal } = useAuthModal();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const DynamicAuthModal = dynamic(
    () =>
      import(/* webpackChunkName:'AuthModal'  */ "@/components/modal/AuthModal")
  );

  const viewRoute = router.asPath.includes("jobs/projects");
  const extraProtectedRoute = router.asPath.includes("user");

  const modalState = viewRoute ? false : true;

  const protectedRoutes =
    router.asPath.includes("bid") ||
    router.asPath.includes("post-job") ||
    extraProtectedRoute;

  useEffect(() => {
    if (!auth && extraProtectedRoute) {
      router.push("/");
    }
    if (!auth && protectedRoutes) {
      dispatch(updateModal("auth-modal"));
    }
  }, [auth, protectedRoutes]);
  return (
    <>
      {((auth === null && modal === "auth-modal" && protectedRoutes) ||
        (auth === null && modal === "auth-modal" && viewRoute)) && (
        <DynamicAuthModal
          modal={modal}
          toggleModal={() => toggleModal(null)}
          persistModal={modalState}
        />
      )}
      {children}
    </>
  );
}
