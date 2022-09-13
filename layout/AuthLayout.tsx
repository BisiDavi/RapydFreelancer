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
  const viewRoute = router.asPath.includes("/jobs");

  const closeModal = viewRoute ? null : "auth-modal";

  const privateRoute =
    router.asPath.includes("pages/bid") ||
    router.asPath.includes("post-job") ||
    router.asPath.includes("user") ||
    viewRoute;

  useEffect(() => {
    if (!auth && !viewRoute) {
      dispatch(updateModal("auth-modal"));
    }
  }, [auth]);
  return (
    <>
      {auth === null && modal === "auth-modal" && privateRoute && (
        <DynamicAuthModal
          modal={modal}
          toggleModal={() => toggleModal(closeModal)}
        />
      )}
      {children}
    </>
  );
}
