import { useForm, FormProvider } from "react-hook-form";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/UI/Button";
import buyConnect from "@/json/buy-connect.json";
import displayFormElement from "@/lib/displayFormElement";
import usePaymentMutation from "@/hooks/usePaymentMutation";
import { formatPrice } from "@/lib/formatPrice";
import { getPaymentData } from "@/lib/payment-data";
import { useAppDispatch } from "@/hooks/useRedux";
import { updatePaymentConnect } from "@/redux/user-slice";
import { buyconnectSchema } from "./schema/profileSchema";

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
    resolver: yupResolver(buyconnectSchema),
    mode: "all",
  });

  const paymentType = methods.watch("paymentType");
  const currency = methods.watch("currency");
  const connectPrice = methods.watch("connectPrice");
  const { useConnectPaymentMutation } = usePaymentMutation();
  const { mutate, isLoading} = useConnectPaymentMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const amount = connectPrice ? formatPrice(connectPrice) : " ";
  const amountValue = currency ? `${currency} ${amount}` : "";

  const onSubmit = (data: any) => {
    console.log("data", data);
    const dataObj = {
      country: data.country,
      currency: data.currency,
      amount: connectPrice,
      connectQuantity: getConnectQuantity(connectPrice),
    };
    const paymentDataObj =
      paymentType === "WALLET"
        ? {
            amount: connectPrice,
            currency: "USD",
            connectQuantity: getConnectQuantity(connectPrice),
          }
        : dataObj;
    const paymentData = getPaymentData(paymentDataObj, "connect");
    mutate(paymentData, {
      onSuccess: (data, variable) => {
        dispatch(updatePaymentConnect(variable.metadata.connectQuantity));
        return router.push(data?.data?.redirect_url);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="mt-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="view">{displayFormElement(buyConnect.first)}</div>
        {paymentType === "WALLET"
          ? displayFormElement(buyConnect.wallet)
          : paymentType === "MAKE_PAYMENT" && (
              <div className="form-view grid grid-cols-2 gap-x-5 w-11/12 ">
                {buyConnect.payment.map((item, index) => (
                  <Fragment key={index}>{displayFormElement(item)}</Fragment>
                ))}
              </div>
            )}

        {paymentType && (
          <Button
            text={`Proceed to Pay ${amountValue}`}
            className="bg-green-500 mx-auto flex items-center my-2 mt-4 px-4 py-2 text-white rounded-md"
            type="submit"
            loading={isLoading}
          />
        )}
      </form>
    </FormProvider>
  );
}
