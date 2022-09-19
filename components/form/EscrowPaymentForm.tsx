interface Props {
  data: {
    price: number;
  };
}

export default function EscrowPaymentForm({ data }: Props) {
  return (
    <div className="mt-8">
      <h4 className="font-bold text-xl">
        You need to make an escrow deposit of ${data.price}
      </h4>
    </div>
  );
}
