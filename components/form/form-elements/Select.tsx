import { useFormContext } from "react-hook-form";

import type { elementType } from "@/types/form-types";
import countriesData from "@/json/countries.json";

export default function Select({ content }: elementType) {
  const {
    register,
    watch,
    formState: { errors },
  }: any = useFormContext();

  const priceValue = watch("price") ? watch("price") : 0;

  const inputValue = content.name === "pricePeriod" ? `$${priceValue} / ` : "";
  const labelClassName =
    content?.inputStyle === "big"
      ? "font-bold my-1 text-lg"
      : "font-medium my-1 text-base";

  const countries: { name: string; Iso2: string | any }[] = countriesData.data;

  const optionsArray = content.name === "country" ? countries : content.options;

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
        {content.name === "country" && <option value="">Select Country</option>}
        {optionsArray?.map((item: any) => {
          const option =
            item?.text === "Total"
              ? `$${priceValue} (${item?.text})`
              : item?.value && content.name === "pricePeriod"
              ? `${inputValue}${item?.text}`
              : item?.text;

          const selectOption =
            content.name === "country"
              ? { value: item?.Iso2, text: item?.name }
              : { value: item.value, text: option };
          return (
            <option key={selectOption?.value} value={selectOption.value}>
              {selectOption.text}
            </option>
          );
        })}
      </select>
      <p className="text-red-500 text-xs">{errors[content.name]?.message}</p>
    </div>
  );
}
