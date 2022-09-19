import BuyConnectForm from "@/components/form/BuyConnectForm";

export default function BuyConnectView() {
  return (
    <div>
      <h4 className="text-center font-bold">
        Buy more connects, this helps you bid for more jobs, you need 1 connect
        to successfully bid for 1 job
      </h4>
      <p className="font-light text-blue-500 text-center">
        You can make payment in your local currency, if supported
      </p>
      <ul className="mt-4">
        <li>10 Connects: $20</li>
        <li>50 Connects: $50</li>
        <li>100 Connects: $90</li>
      </ul>
      <BuyConnectForm />
    </div>
  );
}
