import { Fragment } from "react";

import formContent from "@/json/auth.json";
import displayFormElement from "@/lib/displayFormElement";
import Button from "@/components/UI/Button";

export default function LoginForm() {
  return (
    <form>
      {formContent.login.map((formElement, index) => (
        <Fragment key={index}>{displayFormElement(formElement)}</Fragment>
      ))}
      <Button type="submit" text="Login" />
    </form>
  );
}
