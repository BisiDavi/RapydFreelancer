import { useState } from "react";

import Button from "@/components/UI/Button";

export default function BuyConnectForm() {
  const [connect, setConnect] = useState(0);

  function selectHandler(e: any) {
    setConnect(e.target.value);
  }
  return (
    <form className="flex flex-col w-1/2 mt-4">
      <div className="form-group">
        <label htmlFor="paymentCurrency">
          Do you want to make payment in your USD or Local Currency?
        </label>
        <div className="input-group">
          <div className="radio">
            <input type="radio" placeholder="USD" name="currencyType" /> USD
          </div>
          <div className="radio">
            <input type="radio" name="currencyType" /> Local Currency
          </div>
        </div>
      </div>
      <div className="top flex justify-between">
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
        {/* <SelectCurrency content={} /> */}

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
      </div>
      {connect > 0 && (
        <Button
          text={`Proceed to Pay $${connect}`}
          className="bg-green-500 mx-4 px-4 py-1 text-white rounded-md"
        />
      )}
    </form>
  );
}
