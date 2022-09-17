import { useForm, FormProvider } from "react-hook-form";
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/UI/Button";
import buyConnect from "@/json/buy-connect.json";
import displayFormElement from "@/lib/displayFormElement";
import SelectCurrency from "@/components/form/form-elements/SelectCurrency";
import usePaymentMutation, {
  getCurrencyDailyRate,
} from "@/hooks/usePaymentMutation";

export default function BuyConnectForm() {
  const methods = useForm({
    // resolver: yupResolver(virtualAccountSchema),
    mode: "all",
  });

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  const formValues = methods.watch();
  const currencyType = methods.watch("currencyType");
  const currency = methods.watch("currency");
  const connectQuantity = methods.watch("connectQuantity");
  const { useGetCurrencyRate } = usePaymentMutation();
  const { mutate, data, status, isLoading } = useGetCurrencyRate();

  console.log("formValues", formValues);
  console.log("currency", currency);

  function fetchExchangeRate() {
    mutate(currency);
  }

  return (
    <FormProvider {...methods}>
      <form className="mt-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="form-view grid grid-cols-2 gap-x-5 w-11/12 ">
          {buyConnect.main.map((item, index) => (
            <Fragment key={index}>{displayFormElement(item)}</Fragment>
          ))}
          {currencyType === "LOCAL_CURRENCY" && (
            <SelectCurrency content={buyConnect.other} />
          )}
        </div>

        {currency && (
          <Button
            text={`Fetch currency exchange rate of ${currency}/USD`}
            className="bg-green-500 mx-auto flex my-2 mt-4 px-4 py-2 text-white rounded-md"
            loading={isLoading}
            onClick={fetchExchangeRate}
          />
        )}
        {/* {currency && (
          <Button
            text={`Proceed to Pay $${connectQuantity}`}
            className="bg-green-500 mx-auto flex my-2 mt-4 px-4 py-2 text-white rounded-md"
          />
        )} */}
      </form>
    </FormProvider>
  );
}
