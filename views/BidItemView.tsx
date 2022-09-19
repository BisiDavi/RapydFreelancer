import Button from "@/components/UI/Button";

interface PropType {
  bids: any[];
}

export default function BidItemView({ bids }: PropType) {
  console.log("bids", bids);
  return (
    <div>
      BidItemView
      <Button
        className="bg-green-500 px-4 py-1.5 rounded-md text-white font-bold mx-auto flex items-center justify-center"
        text="Hire"
      />
    </div>
  );
}
