import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import accountForm from "@/json/issue-virtual-account-form.json";
import displayFormElement from "@/lib/displayFormElement";
import { virtualAccountSchema } from "@/components/form/schema/profileSchema";
import Button from "@/components/UI/Button";
import useVirtualAccount from "@/hooks/useRapydVirtualAccount";

export default function IssueVirtualAccountForm() {
  const { applyForVirtualAccount } = useVirtualAccount();
  const methods = useForm({
    resolver: yupResolver(virtualAccountSchema),
    mode: "all",
  });

  const onSubmit = (data: any) => {
    console.log("data", data);
    return applyForVirtualAccount(data);
  };
  
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white p-4 my-4 rounded-lg"
      >
        <p className="font-semibol text-center mt-4">
          Open an account with us to make you wallet active, fill the form below
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
