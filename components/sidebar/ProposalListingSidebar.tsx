import useUI from "@/hooks/useUI";
import ProposalView from "@/views/ProposalView";

export default function ProposalListingSidebar() {
  const { proposalSidebar, closeProposalHandler } = useUI();
  console.log("proposalSidebar", proposalSidebar);
  return (
    <div className="h-screen w-full flex overflow-y-scroll fixed top-0 z-50">
      <div
        className="close w-1/6 bg-gray-500 opacity-50 cursor-pointer"
        onClick={closeProposalHandler}
      />
      <div className="content w-5/6 bg-white  px-6 py-6">
        {proposalSidebar && proposalSidebar.active === "proposal" && (
          <ProposalView proposal={proposalSidebar.data} />
        )}
      </div>
    </div>
  );
}
