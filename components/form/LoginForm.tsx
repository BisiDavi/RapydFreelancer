import { Fragment } from "react";

import formContent from "@/json/auth.json";
import displayFormElement from "@/lib/displayFormElement";
import Button from "@/components/UI/Button";

export default function LoginForm() {
  return (
    <>
      <form className="form shadow rounded border py-2 w-full px-4">
        <h3 className="text-center text-2xl font-bold">Login form</h3>

        {formContent.login.map((formElement, index) => (
          <Fragment key={index}>{displayFormElement(formElement)}</Fragment>
        ))}
        <Button
          type="submit"
          className="bg-blue-500 text-white mt-4 px-4 py-1 mx-auto flex rounded hover:bg-blue-900"
          text="Login"
        />
      </form>
      <style jsx>
        {`
          .form {
            height: 265px;
          }
        `}
      </style>
    </>
  );
}
