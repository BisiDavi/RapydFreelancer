import { useForm, FormProvider } from "react-hook-form";
import { Fragment } from "react";

import escrowpaymentForm from "@/json/escrowpayment.json";
import displayFormElement from "@/lib/displayFormElement";
import Button from "@/components/UI/Button";

interface Props {
  data: {
    price: number;
  };
}

export default function EscrowPaymentForm({ data }: Props) {
  const methods = useForm({
    mode: "all",
  });
  methods.setValue("amount", data.price);
  return (
    <div className="mt-8 lg:w-3/4 w-full mx-auto flex flex-col">
      <h4 className="font-bold text-xl">
        You need to make an escrow deposit of ${data.price}
      </h4>
      <FormProvider {...methods}>
        <form>
          {escrowpaymentForm.map((item, index) => (
            <Fragment key={index}>{displayFormElement(item)}</Fragment>
          ))}
          <Button
            text="Make Deposit"
            className="mx-auto flex bg-green-500 px-4 py-1 text-white font-bold mt-6 rounded-md hover:opacity-80"
          />
        </form>
      </FormProvider>
    </div>
  );
}
