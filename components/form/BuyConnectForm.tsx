import { useForm, FormProvider } from "react-hook-form";
import { Fragment } from "react";
import { useRouter } from "next/router";

import Button from "@/components/UI/Button";
import buyConnect from "@/json/buy-connect.json";
import displayFormElement from "@/lib/displayFormElement";
import SelectCurrency from "@/components/form/form-elements/SelectCurrency";
import usePaymentMutation from "@/hooks/usePaymentMutation";
import { SpinnerLoader } from "@/components/loader/SpinnerRipple";
import { formatPrice } from "@/lib/formatPrice";
import { getConnectPaymentData } from "@/lib/payment-data";
import { useAppDispatch } from "@/hooks/useRedux";
import { updatePaymentConnect } from "@/redux/user-slice";

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

  const currencyType = methods.watch("currencyType");
  const currency = methods.watch("currency");
  const connectPrice = methods.watch("connectPrice");
  const { useGetCurrencyRate, useConnectPaymentMutation } =
    usePaymentMutation();
  const { mutate, data, status, isLoading } = useGetCurrencyRate();
  const connectPayment = useConnectPaymentMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  function fetchExchangeRate() {
    mutate(currency);
  }

  const exchangeRate =
    status === "success" ? Number(connectPrice) * data?.data.rate : 0;

  const payAmount =
    currencyType === "USD"
      ? `$${connectPrice}`
      : typeof exchangeRate === "number"
      ? `${currency} ${Math.round(exchangeRate)}`
      : 0;

  const amount = formatPrice(payAmount);

  const onSubmit = (data: any) => {
    const amount =
      currencyType === "USD" ? connectPrice : Math.round(exchangeRate);
    console.log("data", data);
    const dataObj = {
      ...data,
      amount,
      connectQuantity: getConnectQuantity(connectPrice),
    };
    const paymentData = getConnectPaymentData(dataObj);
    connectPayment.mutate(paymentData, {
      onSuccess: (_, variable) => {
        console.log("data", data);
        dispatch(updatePaymentConnect(variable.metadata.connectQuantity));
        return router.push(data?.data?.redirect_url);
      },
    });
  };

  const paymentCheck =
    currencyType === "USD" && connectPrice
      ? true
      : status === "success" && currency === data.data.buy_currency
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
          status === "success" &&
          currency === data.data.buy_currency &&
          currencyType === "LOCAL_CURRENCY" && (
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
            text={`Proceed to Pay ${amount}`}
            className="bg-green-500 mx-auto flex items-center my-2 mt-4 px-4 py-2 text-white rounded-md"
            type="submit"
            loading={connectPayment.isLoading}
          />
        )}
      </form>
    </FormProvider>
  );
}
