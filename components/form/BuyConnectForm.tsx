import { useForm, FormProvider } from "react-hook-form";
import { Fragment } from "react";

import Button from "@/components/UI/Button";
import buyConnect from "@/json/buy-connect.json";
import displayFormElement from "@/lib/displayFormElement";
import SelectCurrency from "@/components/form/form-elements/SelectCurrency";
import usePaymentMutation from "@/hooks/usePaymentMutation";
import { SpinnerLoader } from "@/components/loader/SpinnerRipple";

function getConnectQuantity(connectPrice: string) {
  if (connectPrice === "20") {
    return 10;
  } else if (connectPrice === "50") {
    return 50;
  } else if (connectPrice === "90") {
    return 100;
  }
}

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
  const connectPrice = methods.watch("connectQuantity");
  const { useGetCurrencyRate } = usePaymentMutation();
  const { mutate, data, status, isLoading } = useGetCurrencyRate();

  console.log("formValues", formValues);
  console.log("currency", currency);

  function fetchExchangeRate() {
    mutate(currency);
  }

  console.log("data-mutation", data?.data);
  console.log("status-mutation", status);

  const exchangeRate =
    status === "success" ? Number(connectPrice) * data?.data.rate : "";

  const payAmount =
    currencyType === "USD" ? `$${connectPrice}` : `${currency} ${exchangeRate}`;

  const paymentCheck =
    currencyType === "USD" && connectPrice
      ? true
      : status === "success"
      ? true
      : false;

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

        {currencyType !== "USD" && currency && (
          <Button
            text={`Fetch currency exchange rate of ${currency}/USD`}
            className="bg-green-500 mx-auto flex my-2 mt-4 px-4 py-2 text-white rounded-md"
            loading={isLoading}
            onClick={fetchExchangeRate}
          />
        )}
        {status === "error" ? (
          "unable to fetch exchange rate"
        ) : status === "loading" ? (
          <SpinnerLoader loadingText="fetching exchange rate" />
        ) : (
          status === "success" && (
            <div className="exchange-rate my-2">
              <h4 className="font-bold">
                1 USD = {data?.data.rate} {currency}
              </h4>
              <h4 className="font-bold">
                {connectPrice} USD = {exchangeRate} {currency}
              </h4>
            </div>
          )
        )}
        {paymentCheck && (
          <Button
            text={`Proceed to Pay ${payAmount}`}
            className="bg-green-500 mx-auto flex my-2 mt-4 px-4 py-2 text-white rounded-md"
          />
        )}
      </form>
    </FormProvider>
  );
}
