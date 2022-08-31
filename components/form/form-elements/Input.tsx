import type { elementType } from "@/types/form-types";

export default function Input({ content }: elementType) {
  const inputClassName =
    content.inputStyle === "big"
      ? { label: "font-bold my-2 text-lg", wrapper: "my-4", input: "h-12" }
      : { label: "font-medium my-1 text-base", wrapper: "my-2", input: "h-10" };
  return (
    <div className={`form flex flex-col ${inputClassName.wrapper}`}>
      <label htmlFor={content.name} className={inputClassName.label}>
        {content.label}
      </label>
      <input
        id={content.name}
        placeholder={content.placeholder}
        type={content.elementType}
        className={`rounded-lg ${inputClassName.input} px-4 border`}
      />
    </div>
  );
}
