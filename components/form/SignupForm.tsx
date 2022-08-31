import { Fragment } from "react";

import formContent from "@/json/auth.json";
import displayFormElement from "@/lib/displayFormElement";
import Button from "@/components/UI/Button";

export default function SignupForm() {
  return (
    <>
      <form className="form shadow rounded border py-2 w-full px-4">
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
            height: 420px;
          }
        `}
      </style>
    </>
  );
}
