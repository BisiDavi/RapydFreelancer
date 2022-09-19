import JobBanner from "@/components/banners/JobBanner";
import Button from "@/components/UI/Button";

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
  console.log("bids", bids);

  return (
    <div>
      <JobBanner title={bids[0].title} price={bids[0].price} />
      <h4 className="font-bold text-center text-xl">
        View Submitted Proposals from Rapyd Freelancers
      </h4>
      <h4>
        Current Received Proposal{" "}
        <span className="font-bold">({bids.length})</span>
      </h4>
      <ul>
        {bids.map((item, index) => (
          <li key={index} className="my-2">
            <p>Freelancer Name: {item.freelancer.displayName}</p>
            <p>Freelancer Email: {item.freelancer.email}</p>
            <p>Price: {item.price}</p>
            <Button text={`View ${item.freelancer.displayName} Proposal`} />
          </li>
        ))}
      </ul>
      <Button
        className="bg-green-500 px-4 py-1.5 rounded-md text-white font-bold mx-auto flex items-center justify-center"
        text="Hire"
      />
    </div>
  );
}
