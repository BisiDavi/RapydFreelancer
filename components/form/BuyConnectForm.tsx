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
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updatePaymentConnect } from "@/redux/user-slice";
import { buyconnectSchema } from "./schema/profileSchema";
import { getConnectQuantity } from "@/lib/fomatData";
import useConnect from "@/hooks/useConnect";

export default function BuyConnectForm() {
  const methods = useForm({
    resolver: yupResolver(buyconnectSchema),
    mode: "all",
  });

  const paymentType = methods.watch("paymentType");
  const currency = methods.watch("currency");
  const connectPrice = methods.watch("connectPrice");
  const { useConnectPaymentMutation, useWalletConnectPaymentMutation } =
    usePaymentMutation();
  const { profile } = useAppSelector((state) => state.user);
  const walletConnectPayment = useWalletConnectPaymentMutation();
  const { mutate, isLoading } = useConnectPaymentMutation();
  const router = useRouter();
  const { walletConnectPaymentDBUpdate } = useConnect();
  const dispatch = useAppDispatch();

  const amount = connectPrice ? formatPrice(connectPrice) : " ";
  const amountValue = currency ? `${amount} ${currency}` : "";

  const connectQuantity: any = connectPrice
    ? getConnectQuantity(connectPrice)
    : 0;

  function makePaymentHandler(paymentData: any) {
    mutate(paymentData, {
      onSuccess: (data, variable) => {
        console.log("variable.connectQuantity", variable.connectQuantity);
        dispatch(updatePaymentConnect(variable.connectQuantity));
        return router.push(data?.data?.redirect_url);
      },
    });
  }

  function walletPaymentHandler(paymentData: any) {
    walletConnectPayment.mutate(paymentData, {
      onSuccess: (data) => {
        console.log("data", data);
        walletConnectPaymentDBUpdate(connectQuantity, router);
      },
    });
  }

  const onSubmit = (data: any) => {
    console.log("data", data);
    const dataObj = {
      country: data.country,
      currency: data.currency,
      amount: connectPrice,
      connectQuantity: getConnectQuantity(connectPrice),
    };
    const makePaymentData = getPaymentData(dataObj, "connect");
    const walletPaymentData = {
      amount: connectPrice,
      currency: "USD",
      source_ewallet: profile?.ewallet,
      destination_ewallet: "ewallet_4e58c9af1b0a15853bfee6f1ffcc7a70",
    };

    if (paymentType === "WALLET") {
      walletPaymentHandler(walletPaymentData);
    } else {
      makePaymentHandler(makePaymentData);
    }
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
            loading={isLoading || walletConnectPayment.isLoading}
          />
        )}
      </form>
    </FormProvider>
  );
}
