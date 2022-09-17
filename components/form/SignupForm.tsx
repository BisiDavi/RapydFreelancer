import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/UI/Button";
import { signupSchema } from "@/components/form/schema/authSchema";
import useAuthMutation from "@/hooks/useAuthMutation";
import {
  displayModalSignupForm,
  displaySignupForm,
} from "@/lib/displaySignupForm";
import { defaultMessage } from "@/lib/messages";

interface FormInputsProps {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  type?: string;
}

export default function SignupForm({ type }: Props) {
  const methods = useForm<FormInputsProps>({
    resolver: yupResolver(signupSchema),
    mode: "all",
  });

  const { useSignupMutation } = useAuthMutation();
  const { mutate, isLoading } = useSignupMutation();

  const onSubmit = (data: any) => {
    const message = defaultMessage(data);
    const { name, email, role, password } = data;
    const formData = {
      name,
      email,
      role,
    };

    const userData = {
      ...formData,
      bids: [],
      hires: [],
      messages: [message],
      connects: 5,
    };
    return mutate(
      { userData, password },
      {
        onSuccess: (data) => {
          console.log("mutate-onSuccess", data);
        },
      }
    );
  };
  return (
    <FormProvider {...methods}>
      <form
        className="form shadow rounded border py-2 w-full px-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h3 className="text-center text-2xl font-bold">Sign up form</h3>
        {!type ? displaySignupForm() : displayModalSignupForm()}
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 mt-4 py-1 mx-auto flex rounded hover:bg-blue-900"
          text="Signup"
          loading={isLoading}
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
