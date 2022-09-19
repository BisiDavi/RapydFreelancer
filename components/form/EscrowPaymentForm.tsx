import { useForm, FormProvider } from "react-hook-form";
import { Fragment } from "react";
import { useRouter } from "next/router";

import escrowpaymentForm from "@/json/escrowpayment.json";
import displayFormElement from "@/lib/displayFormElement";
import Button from "@/components/UI/Button";
import useEscrowMutation from "@/hooks/useEscrowpayment";
import { getEscrowData } from "@/lib/payment-data";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateHire } from "@/redux/payment-slice";

interface Props {
  formData: {
    price: number;
    title: string;
    freelancer: {
      email: string;
      displayName: string;
    };
  };
}

export default function EscrowPaymentForm({ formData }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate, isLoading } = useEscrowMutation();
  const methods = useForm({
    mode: "all",
  });
  methods.setValue("amount", formData.price);
  const escrowPaymentObj = {
    amount: formData.price,
    country: "US",
    currency: "USD",
    escrow: true,
  };
  const payment = getEscrowData(escrowPaymentObj, "job");

  function onSubmitHandler() {
    mutate(
      { data: payment, email: formData.freelancer.email },
      {
        onSuccess: (data) => {
          console.log("data", data?.data);
          dispatch(
            updateHire([
              {
                freelancer: formData.freelancer,
                price: formData.price,
                title: formData.title,
              },
            ])
          );
          return router.push(data?.data?.redirect_url);
        },
      }
    );
  }

  return (
    <div className="mt-8 lg:w-3/4 w-full mx-auto flex flex-col">
      <h4 className="font-bold text-xl">
        You need to make an escrow deposit of ${formData.price}
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
            type="submit"
          />
        </form>
      </FormProvider>
    </div>
  );
}
