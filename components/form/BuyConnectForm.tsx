import { useForm, FormProvider } from "react-hook-form";
import { Fragment, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/UI/Button";
import buyConnect from "@/json/buy-connect.json";
import displayFormElement from "@/lib/displayFormElement";
import SelectCurrency from "./form-elements/SelectCurrency";

export default function BuyConnectForm() {
  const [connect, setConnect] = useState(0);

  const methods = useForm({
    // resolver: yupResolver(virtualAccountSchema),
    mode: "all",
  });

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  const formValues = methods.watch();
  const currencyType = methods.watch("currencyType");

  console.log("formValues", formValues);

  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-2 gap-x-5 w-11/12 mt-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {buyConnect.main.map((item, index) => (
          <Fragment key={index}>{displayFormElement(item)}</Fragment>
        ))}
        {currencyType === "LOCAL_CURRENCY" && (
          <SelectCurrency content={buyConnect.other} />
        )}
        {connect > 0 && (
          <Button
            text={`Proceed to Pay $${connect}`}
            className="bg-green-500 mx-4 px-4 py-1 text-white rounded-md"
          />
        )}
      </form>
    </FormProvider>
  );
}
