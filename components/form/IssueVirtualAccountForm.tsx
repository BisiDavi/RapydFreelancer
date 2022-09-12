import { Fragment } from "react";
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
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {accountForm.map((formElement) => (
          <Fragment key={formElement.name}>
            {displayFormElement(formElement)}
          </Fragment>
        ))}
      </form>
    </FormProvider>
  );
}
