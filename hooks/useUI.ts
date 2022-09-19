import { updateModal, updateProposal } from "@/redux/ui-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import type { modalStateType } from "@/types/redux-types";

export default function useUI() {
  const dispatch = useAppDispatch();
  const { modal, proposalSidebar } = useAppSelector((state) => state.UI);

  function toggleModal(modalState: modalStateType) {
    dispatch(updateModal(modalState));
  }

  function closeProposalHandler() {
    dispatch(updateProposal({ data: null, active: false }));
  }

  function updateProposalHandler(activeBidProposal: any) {
    dispatch(updateProposal({ data: activeBidProposal, active: true }));
  }

  return {
    modal,
    toggleModal,
    proposalSidebar,
    closeProposalHandler,
    updateProposalHandler,
  };
}
