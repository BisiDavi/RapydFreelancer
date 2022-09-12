import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useState } from "react";

export default function PhoneNumberInput() {
  const [phonenumber, setPhoneNumber] = useState<any>("");
  return (
    <div>
      <PhoneInput
        value={phonenumber}
        placeholder="Enter your phone number"
        onChange={setPhoneNumber}
        international
        error={
          phonenumber
            ? isValidPhoneNumber(phonenumber)
              ? undefined
              : "Invalid phone number"
            : "Phone number required"
        }
      />
    </div>
  );
}
