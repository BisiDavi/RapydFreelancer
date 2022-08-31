import { Fragment } from "react";

import formContent from "@/json/auth.json";
import displayFormElement from "@/lib/displayFormElement";
import Button from "@/components/UI/Button";

export default function SignupForm() {
  return (
    <form>
      {formContent.signup.map((formElement, index) => (
        <Fragment key={index}>{displayFormElement(formElement)}</Fragment>
      ))}
      <Button type="submit" text="Signup" />
    </form>
  );
}
