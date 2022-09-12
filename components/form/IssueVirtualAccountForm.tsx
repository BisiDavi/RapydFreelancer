import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import accountForm from "@/json/issue-virtual-account-form.json";
import displayFormElement from "@/lib/displayFormElement";
import { virtualAccountSchema } from "@/components/form/schema/profileSchema";

export default function IssueVirtualAccountForm() {
  const methods = useForm({
    resolver: yupResolver(virtualAccountSchema),
    mode: "all",
  });

  const onSubmit = (data: any) => {
    console.log("data", data);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="bg-white p-4 my-4 rounded-lg"
      >
        <div className="form-elements flex items-center">
          {accountForm.map((formElement) => (
            <div key={formElement.name} className="w-1/2 mx-4">
              {displayFormElement(formElement)}
            </div>
          ))}
        </div>
      </form>
    </FormProvider>
  );
}
