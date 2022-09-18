import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import accountForm from "@/json/issue-virtual-account-form.json";
import displayFormElement from "@/lib/displayFormElement";
import { virtualAccountSchema } from "@/components/form/schema/profileSchema";
import Button from "@/components/UI/Button";
import countriesCurrency from "@/json/countrycurrency.json";
import usePaymentMutation from "@/hooks/usePaymentMutation";
import { fundWalletPaymentData } from "@/lib/payment-data";
import { getPaymentByCountry } from "@/request/getRequest";
import { SpinnerLoader } from "@/components/loader/SpinnerRipple";

interface Props {
  ewallet: string;
}

export default function IssueVirtualAccountForm({ ewallet }: Props) {
  const { useFundWalletMutation } = usePaymentMutation();
  const { mutate } = useFundWalletMutation();
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

  const { data, status } = useQuery(
    ["getPaymentByCountry"],
    () => getPaymentByCountry(country, currency),
    {
      enabled: !!(country && currency),
      notifyOnChangeProps: [country, currency],
    }
  );

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
        {status === "error"
          ? "error fetching payment by country"
          : status === "loading"
          ? country &&
            currency && (
              <SpinnerLoader loadingText="Fetching payment by country..." />
            )
          : null}
        {status === "success" && (
          <Button
            text="Submit"
            className="bg-blue-500 mx-auto flex my-4 px-3 py-1.5 font-bold rounded-lg text-white hover:bg-blue-800"
            type="submit"
          />
        )}
      </form>
    </FormProvider>
  );
}
