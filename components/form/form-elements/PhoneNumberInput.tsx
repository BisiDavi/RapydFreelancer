import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

import type { elementType } from "@/types/form-types";

export default function PhoneNumberInput({ content }: elementType) {
  const [phonenumber, setPhonenumber] = useState<any>("");
  const { register, setValue } = useFormContext();

  console.log("phonenumber", phonenumber);
  register("phonenumber");

  function onChangeHandler(value: string) {
    setPhonenumber(value);
    setValue("phonenumber", value);
  }

  return (
    <div className="form-group w-full">
      <div className="form flex flex-col relative my-2">
        <label htmlFor={content.name} className="font-medium my-1 text-base">
          {content.label}
        </label>
        <PhoneInput
          international
          placeholder="Enter your phone number"
          className="rounded-lg h-10 px-4 flex items-center"
          onChange={onChangeHandler}
          value={phonenumber}
          error={
            phonenumber ? (
              isValidPhoneNumber(phonenumber) ? undefined : (
                <p className="text-red-500 p-0  text-xs">
                  Invalid phone number
                </p>
              )
            ) : (
              <p className="text-red-500 p-0  text-xs">Phone number required</p>
            )
          }
        />
      </div>
    </div>
  );
}
