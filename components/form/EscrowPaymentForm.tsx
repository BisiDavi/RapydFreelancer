import { useForm, FormProvider } from "react-hook-form";
import { Fragment } from "react";

import escrowpaymentForm from "@/json/escrowpayment.json";
import displayFormElement from "@/lib/displayFormElement";
import Button from "@/components/UI/Button";
import useEscrowMutation from "@/hooks/useEscrowpayment";
import { getPaymentData } from "@/lib/payment-data";
import axios from "axios";

interface Props {
  data: {
    price: number;
  };
}

export default function EscrowPaymentForm({ data }: Props) {
  const { mutate, isLoading } = useEscrowMutation();
  const methods = useForm({
    mode: "all",
  });
  methods.setValue("amount", data.price);
  const escrowPaymentObj = {
    amount: data.price,
    country: "US",
    currency: "USD",
    requested_currency: "USD",
    escrow: true,
  };
  const payment = getPaymentData(escrowPaymentObj, "job");

  function onSubmitHandler() {
    mutate(payment);
  }

  return (
    <div className="mt-8 lg:w-3/4 w-full mx-auto flex flex-col">
      <h4 className="font-bold text-xl">
        You need to make an escrow deposit of ${data.price}
      </h4>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          {escrowpaymentForm.map((item, index) => (
            <Fragment key={index}>{displayFormElement(item)}</Fragment>
          ))}
          <Button
            text="Make Deposit"
            className="mx-auto flex bg-green-500 px-4 py-1 text-white font-bold mt-6 rounded-md hover:opacity-80"
            loading={isLoading}
          />
        </form>
      </FormProvider>
    </div>
  );
}
