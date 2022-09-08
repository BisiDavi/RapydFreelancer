/* eslint-disable react-hooks/exhaustive-deps */
import { updateModal } from "@/redux/ui-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import type { modalStateType } from "@/types/redux-types";

export default function useAuthModal() {
  const dispatch = useAppDispatch();

  const { modal } = useAppSelector((state) => state.UI);

  function toggleModal(modalState: modalStateType) {
    dispatch(updateModal(modalState));
  }

  return { modal, toggleModal };
}
