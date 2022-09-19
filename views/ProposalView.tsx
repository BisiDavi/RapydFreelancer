import React from "react";
import ContentEditable from "react-contenteditable";

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
  return (
    <div>
      <h3 className="font-bold">{proposal.title}</h3>
      <h3>Price:{proposal.price}</h3>
      <h3>Freelancer Name:{proposal.freelancer.displayName}</h3>
      <h3>Freelancer Email:{proposal.freelancer.email}</h3>
      <ContentEditable
        className="w-full border p-4 border-blue-500 rounded-xl h-400"
        html={proposal.proposal}
        onChange={() => null}
        disabled={true}
      />
      <p>Submitted on :{submittedOn} </p>
    </div>
  );
}
