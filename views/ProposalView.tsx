import ContentEditable from "react-contenteditable";

import Button from "@/components/UI/Button";
import useUI from "@/hooks/useUI";

interface Props {
  proposal: {
    title: string;
    price: number;
    freelancer: {
      displayName: string;
      email: string;
    };
    proposal: string;
    createdAt: string;
  };
}

export default function ProposalView({ proposal }: Props) {
  const submittedOn = new Date(proposal.createdAt).toDateString();
  const { proposalStatusHandler } = useUI();
  return (
    <div>
      <h3 className="font-bold text-xl underline">{proposal.title}</h3>
      <h3 className="text-lg mt-1">
        <span className="font-bold mr-1">Price:</span>${proposal.price}
      </h3>
      <h3 className="text-lg">
        <span className="font-bold mr-1">Freelancer Name:</span>
        {proposal.freelancer.displayName}
      </h3>
      <h3 className="text-lg">
        <span className="font-bold mr-1">Freelancer Email:</span>
        {proposal.freelancer.email}
      </h3>
      <ContentEditable
        className="w-full mt-4 border p-4 border-blue-500 rounded-xl h-400"
        html={proposal.proposal}
        onChange={() => null}
        disabled={true}
      />
      <p className="mt-1">Submitted on: {submittedOn} </p>
      <Button
        className="bg-green-500 px-4 py-1.5 mt-4 hover:opacity-70 rounded-md text-white font-bold mx-auto flex items-center justify-center"
        text={`Hire ${proposal.freelancer.displayName}`}
        onClick={() => proposalStatusHandler("escrow-deposit")}
      />
    </div>
  );
}
