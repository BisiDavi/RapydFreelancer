interface Props {
  data: {
    price: number;
  };
}

export default function EscrowPaymentForm({ data }: Props) {
  return (
    <div>
      <h4>You need to make an escrow deposit of ${data.price}</h4>
    </div>
  );
}