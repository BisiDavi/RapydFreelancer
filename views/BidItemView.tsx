import JobBanner from "@/components/banners/JobBanner";
import Button from "@/components/UI/Button";
import useHeader from "@/hooks/useHeader";
import useUI from "@/hooks/useUI";
import greetUser from "@/lib/greetUser";

interface PropType {
  bids: {
    title: string;
    price: number;
    freelancer: {
      displayName: string;
      email: string;
    };
  }[];
}

export default function BidItemView({ bids }: PropType) {
  const { auth } = useHeader();
  const { updateProposalHandler } = useUI();

  function viewProposalHander(name: string) {
    const activeBidProposal = bids.filter(
      (item) => item.freelancer.displayName === name
    )[0];
    updateProposalHandler(activeBidProposal, "proposal");
  }

  return (
    <div>
      <JobBanner title={bids[0].title} price={bids[0].price} className="px-6" />
      <div className="content px-6 py-4">
        <h3 className="text-xl font-bold mb-4">
          {greetUser()}, {auth?.displayName}
        </h3>
        <h4 className="font-bold text-center text-xl my-4">
          View Submitted Proposals from Rapyd Freelancers
        </h4>
        <h4>
          Current Received Proposal{" "}
          <span className="font-bold">({bids.length})</span>
        </h4>
        <ul>
          {bids.map((item, index) => (
            <li
              key={index}
              className="my-2 bg-white rounded justify-between flex items-center px-4 py-2"
            >
              <div className="left">
                <p>Freelancer Name: {item.freelancer.displayName}</p>
                <p>Freelancer Email: {item.freelancer.email}</p>
                <p>Price: ${item.price}</p>
              </div>
              <Button
                text={`View ${item.freelancer.displayName} Proposal`}
                className="bg-red-500 px-3 py-1 text-white hover:opacity-80 font-bold  my-4"
                onClick={() => viewProposalHander(item.freelancer.displayName)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
