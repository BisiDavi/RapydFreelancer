/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { updateModal } from "@/redux/ui-slice";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import type { modalStateType } from "@/types/redux-types";

export default function useAuthModal() {
  const { authDetails } = useAuth();
  const auth = authDetails();
  const dispatch = useAppDispatch();

  console.log("auth", auth);

  const { modal } = useAppSelector((state) => state.UI);

  function toggleModal(modalState: modalStateType) {
    dispatch(updateModal(modalState));
  }

  useEffect(() => {
    if (!auth) {
      dispatch(updateModal("auth-modal"));
    }
  }, [auth]);

  return { modal, toggleModal };
}
