import { useFormContext } from "react-hook-form";

import type { elementType } from "@/types/form-types";
import countriesData from "@/json/countries.json";

export default function SelectCountry({ content }: elementType) {
  const {
    register,
    formState: { errors },
  }: any = useFormContext();

  const labelClassName =
    content?.inputStyle === "big"
      ? "font-bold my-1 text-lg"
      : "font-medium my-1 text-base";

  const countries: { name: string; Iso2: string | any }[] = countriesData;

  return (
    <div className={`form flex flex-col relative my-2 w-full`}>
      <label htmlFor={content.name} className={labelClassName}>
        {content.label}
      </label>
      <select
        id={content.name}
        className="rounded-lg h-10 px-4 border"
        aria-invalid={errors[content.name] ? "true" : "false"}
        {...register(content.name)}
      >
        <option value="">Select Country</option>
        {countries.map((item) => (
          <option key={item.Iso2} value={item.Iso2}>
            {item.name}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-xs">{errors[content.name]?.message}</p>
    </div>
  );
}
