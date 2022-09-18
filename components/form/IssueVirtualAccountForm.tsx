import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

import accountForm from "@/json/issue-virtual-account-form.json";
import displayFormElement from "@/lib/displayFormElement";
import { virtualAccountSchema } from "@/components/form/schema/profileSchema";
import Button from "@/components/UI/Button";
import countriesCurrency from "@/json/countrycurrency.json";
import usePaymentMutation from "@/hooks/usePaymentMutation";
import { fundWalletPaymentData } from "@/lib/payment-data";

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

  const country = countriesCurrency.filter(
    (item) => item.currency === currency
  )[0]?.countryCode;

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
        <div className="form-elements flex items-center">
          {accountForm.map((formElement) => (
            <div key={formElement.name} className="w-1/2 mx-4">
              {displayFormElement(formElement)}
            </div>
          ))}
        </div>
        <Button
          text="Submit"
          className="bg-blue-500 mx-auto flex my-4 px-3 py-1.5 font-bold rounded-lg text-white hover:bg-blue-800"
          type="submit"
        />
      </form>
    </FormProvider>
  );
}
