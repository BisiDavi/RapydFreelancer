import { useFormContext } from "react-hook-form";
import { useState } from "react";

import ToggleEye from "@/components/form/form-elements/ToggleEye";
import type { elementType } from "@/types/form-types";

export default function Input({ content }: elementType) {
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const {
    register,
    formState: { errors },
  }: any = useFormContext();

  const inputClassName =
    content.inputStyle === "big"
      ? { label: "font-bold my-1 text-lg", input: "h-12" }
      : { label: "font-medium my-1 text-base", input: "h-10" };

  const inputType =
    content.elementType === "password"
      ? passwordVisiblity
        ? "text"
        : "password"
      : content.elementType;

  return (
    <div className="form-group w-full">
      <div className="form flex flex-col relative my-2">
        <label htmlFor={content.name} className={inputClassName.label}>
          {content.label}
        </label>
        <input
          id={content.name}
          placeholder={content.placeholder}
          type={inputType}
          className="rounded-lg h-10 px-4 border"
          aria-invalid={errors[content.name] ? "true" : "false"}
          {...register(content.name)}
        />

        {content.elementType === "password" && (
          <ToggleEye
            passwordVisiblity={passwordVisiblity}
            setPasswordVisibility={setPasswordVisibility}
          />
        )}
      </div>
      <p className="text-red-500 p-0  text-xs">
        {errors[content.name]?.message}
      </p>
    </div>
  );
}
