import {
  updateModal,
  updateProposal,
  updateProposalStatus,
} from "@/redux/ui-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import type { modalStateType, UIStateType } from "@/types/redux-types";

export default function useUI() {
  const dispatch = useAppDispatch();
  const { modal, proposalSidebar } = useAppSelector((state) => state.UI);

  function toggleModal(modalState: modalStateType) {
    dispatch(updateModal(modalState));
  }

  function closeProposalHandler() {
    dispatch(updateProposal({ data: null, active: null }));
  }

  function updateProposalHandler(
    activeBidProposal: any,
    proposalState: UIStateType["proposalSidebar"]["active"]
  ) {
    dispatch(
      updateProposal({ data: activeBidProposal, active: proposalState })
    );
  }
  function proposalStatusHandler(
    status: UIStateType["proposalSidebar"]["active"]
  ) {
    dispatch(updateProposalStatus(status));
  }

  return {
    modal,
    toggleModal,
    proposalSidebar,
    closeProposalHandler,
    updateProposalHandler,
    proposalStatusHandler,
  };
}
