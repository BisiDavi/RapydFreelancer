import { Fragment } from "react";

import displayFormElement from "@/lib/displayFormElement";
import formContent from "@/json/auth.json";
import spaceRow from "@/lib/spaceRow";

export function displaySignupForm() {
  return formContent.signup.map((formElement, index) => (
    <Fragment key={index}>{displayFormElement(formElement)}</Fragment>
  ));
}

export function displayModalSignupForm() {
  return formContent.bigSignup.map((formElement, index: number) => {
    const inputClassName = formElement.length === 2 ? "w-1/2" : "w-full";
    return (
      <div className="form-group flex" key={index}>
        {formElement.map((formElementItem, idx) => {
          const spacing = spaceRow(formElement, idx);
          return (
            <div
              key={idx}
              className={`${inputClassName} ${spacing} flex items-center`}
            >
              {displayFormElement(formElementItem)}
            </div>
          );
        })}
      </div>
    );
  });
}
