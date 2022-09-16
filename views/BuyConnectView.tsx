import { useState } from "react";

export default function BuyConnectView() {
  const [connect, setConnect] = useState();
  return (
    <div>
      <h4 className="text-center font-bold">
        Buy more connects, this helps you bid for more jobs, you need 1 connect
        to successfully bid for 1 job
      </h4>
      <ul>
        <li>10 Connects: $20</li>
        <li>50 Connects: $50</li>
        <li>100 Connects: $90</li>
      </ul>
    </div>
  );
}
