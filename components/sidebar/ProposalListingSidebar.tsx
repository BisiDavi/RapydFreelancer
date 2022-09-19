import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateProposal } from "@/redux/ui-slice";
import ProposalView from "@/views/ProposalView";

export default function ProposalListingSidebar() {
  const { proposalSidebar } = useAppSelector((state) => state.UI);
  const dispatch = useAppDispatch();

  function closeHandler() {
    dispatch(updateProposal({ data: null, active: false }));
  }
  return (
    <div className="h-screen w-full flex overflow-y-scroll fixed top-0 z-50">
      <div
        className="close w-1/6 bg-gray-500 opacity-50 cursor-pointer"
        onClick={closeHandler}
      />
      <div className="content w-5/6 bg-white  px-6 py-6">
        {proposalSidebar && <ProposalView proposal={proposalSidebar.data} />}
      </div>
    </div>
  );
}
