import { useRouter } from "next/router";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import accountForm from "@/json/issue-virtual-account-form.json";
import displayFormElement from "@/lib/displayFormElement";
import { virtualAccountSchema } from "@/components/form/schema/profileSchema";
import Button from "@/components/UI/Button";
import usePaymentMutation from "@/hooks/usePaymentMutation";
import { getPaymentData } from "@/lib/payment-data";

interface Props {
  ewallet: string;
}

export default function FundAccountForm({ ewallet }: Props) {
  const { useFundWalletMutation } = usePaymentMutation();
  const router = useRouter();
  const { mutate, status, data, variables } = useFundWalletMutation();
  const methods = useForm({
    resolver: yupResolver(virtualAccountSchema),
    mode: "all",
  });

  const onSubmit = (data: any) => {
    const wData = { ...data, ewallet };
    console.log("wData", wData);
    const walletData = getPaymentData(wData, "fund-wallet");
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
          text="Fund Wallet"
          className="bg-blue-500 mx-auto flex my-4 px-3 py-1.5 font-bold rounded-lg text-white hover:bg-blue-800"
          type="submit"
        />
      </form>
    </FormProvider>
  );
}
