import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import accountForm from "@/json/issue-virtual-account-form.json";
import displayFormElement from "@/lib/displayFormElement";
import { virtualAccountSchema } from "@/components/form/schema/profileSchema";
import Button from "@/components/UI/Button";
import usePaymentMutation from "@/hooks/usePaymentMutation";
import { fundWalletPaymentData } from "@/lib/payment-data";
import { SpinnerLoader } from "@/components/loader/SpinnerRipple";
import PaymentTab from "@/components/payment/PaymentTab";
import { getCountry } from "@/lib/fomatData";

interface Props {
  ewallet: string;
}

export default function IssueVirtualAccountForm({ ewallet }: Props) {
  const { useFundWalletMutation, usePaymentByMethod } = usePaymentMutation();
  const { mutate } = useFundWalletMutation();
  const {
    mutate: mutatePayment,
    status,
    data,
    variables,
  } = usePaymentByMethod();
  const methods = useForm({
    resolver: yupResolver(virtualAccountSchema),
    mode: "all",
  });
  const { watch } = methods;
  const router = useRouter();

  const currency = watch("currency");
  const country = watch("country");

  console.log("country", country);
  console.log("currency", currency);

  function getPaymentByCountryHandler() {
    if (!country || !currency) {
      toast.warn("country and currency fields are required");
    }
    if (country && currency) {
      return mutatePayment({ country, currency });
    }
  }

  console.log("data-getPaymentByCountry", data?.data);

  const onSubmit = (data: any) => {
    const wData = { ...data, country, ewallet };
    const walletData = fundWalletPaymentData(wData);
    mutate(walletData, {
      onSuccess: (data) => {
        return router.push(data?.data?.redirect_url);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white p-4 my-4 rounded-lg"
      >
        <p className="font-semibold text-center mt-4">
          Do you know you can fund your wallet, get started by filling the form
          below
        </p>
        <div className="form-elements grid grid-cols-2 gap-x-6 items-center pr-6">
          {accountForm.map((formElement) => (
            <div key={formElement.name} className="w-full mx-4">
              {displayFormElement(formElement)}
            </div>
          ))}
        </div>
        <Button
          text="Fetch Payment Method"
          className="bg-blue-500 mx-auto flex my-4 px-3 py-1.5 font-bold rounded-lg text-white hover:bg-blue-800"
          onClick={getPaymentByCountryHandler}
        />
        {status === "error" ? (
          "error fetching payment by country"
        ) : status === "loading" ? (
          country &&
          currency && (
            <SpinnerLoader loadingText="Fetching payment by country..." />
          )
        ) : data?.data.length > 0 ? (
          <PaymentTab paymentMethod={data?.data} />
        ) : (
          data?.data.length === 0 && (
            <p className="font-bold text-center">
              No Payment method supported for {getCountry(variables.country)}
              and
              {variables.currency}
            </p>
          )
        )}
      </form>
    </FormProvider>
  );
}
