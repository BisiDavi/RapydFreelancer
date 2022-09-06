import { useFormContext } from "react-hook-form";

import type { elementType } from "@/types/form-types";

export default function Select({ content }: elementType) {
  const {
    register,
    watch,
    formState: { errors },
  }: any = useFormContext();

  const priceValue = watch("price") ? watch("price") : 0;

  const inputValue = content.name === "pricePeriod" ? `$${priceValue} / ` : "";
  const labelClassName = content?.inputStyle
    ? "font-medium my-1 text-base"
    : "font-bold my-1 text-lg";

  return (
    <div className="form flex flex-col relative my-2 w-full">
      <label htmlFor={content.name} className={labelClassName}>
        {content.label}
      </label>
      <select
        id={content.name}
        className="rounded-lg h-10 px-4 border"
        aria-invalid={errors[content.name] ? "true" : "false"}
        {...register(content.name)}
      >
        {content.options?.map((item) => {
          const option =
            item.text === "Total"
              ? `$${priceValue} (${item.text})`
              : item.value && content.name === "pricePeriod"
              ? `${inputValue}${item.text}`
              : item.text;

          return (
            <option key={item.value} value={item.value}>
              {option}
            </option>
          );
        })}
      </select>
      <p className="text-red-500 text-xs">{errors[content.name]?.message}</p>
    </div>
  );
}
