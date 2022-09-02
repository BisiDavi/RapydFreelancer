import { Fragment } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import formContent from "@/json/auth.json";
import displayFormElement from "@/lib/displayFormElement";
import Button from "@/components/UI/Button";
import { signupSchema } from "@/components/form/schema/authSchema";

interface FormInputsProps {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const methods = useForm<FormInputsProps>({
    resolver: yupResolver(signupSchema),
    mode: "all",
  });

  const onSubmit = (data: any) => console.log("data", data);
  return (
    <FormProvider {...methods}>
      <form
        className="form shadow rounded border py-2 w-full px-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h3 className="text-center text-2xl font-bold">Sign up form</h3>
        {formContent.signup.map((formElement, index) => (
          <Fragment key={index}>{displayFormElement(formElement)}</Fragment>
        ))}
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 mt-4 py-1 mx-auto flex rounded hover:bg-blue-900"
          text="Signup"
        />
      </form>
      <style jsx>
        {`
          .form {
            height: fit-content;
          }
        `}
      </style>
    </FormProvider>
  );
}
