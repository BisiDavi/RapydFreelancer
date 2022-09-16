import { useState } from "react";

import Button from "@/components/UI/Button";

export default function BuyConnectView() {
  const [connect, setConnect] = useState(0);

  function selectHandler(e: any) {
    setConnect(e.target.value);
  }

  console.log("connect", connect);

  return (
    <div>
      <h4 className="text-center font-bold">
        Buy more connects, this helps you bid for more jobs, you need 1 connect
        to successfully bid for 1 job
      </h4>
      <ul className="mt-4">
        <li>10 Connects: $20</li>
        <li>50 Connects: $50</li>
        <li>100 Connects: $90</li>
      </ul>
      <select
        name="buyConnect"
        className="mt-4 px-4 py-1"
        id="buyConnect"
        onChange={selectHandler}
      >
        <option value="">Select Connect Quantity</option>
        <option value="20">$20</option>
        <option value="50">$50</option>
        <option value="90">$90</option>
      </select>
      <select
        name="paymentMode"
        className="mt-4 px-4 py-1"
        id="paymentMode"
        onChange={selectHandler}
      >
        <option value="">Select Payment Mode</option>
        <option value="Card">Card</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Cash">Cash</option>
      </select>
      {connect > 0 && (
        <Button
          text={`Proceed to Pay $${connect}`}
          className="bg-green-500 mx-4 px-4 py-1 text-white rounded-md"
        />
      )}
    </div>
  );
}
