import { useFormContext } from "react-hook-form";

import type { elementType } from "@/types/form-types";
import currencies from "@/json/currencies.json";

export default function SelectCurrency({ content }: elementType) {
  const {
    register,
    formState: { errors },
  }: any = useFormContext();

  return (
    <div className="form flex flex-col relative my-2 w-full">
      <label htmlFor={content.name} className="font-medium my-1 text-base">
        {content.label}
      </label>
      <select
        id={content.name}
        className="rounded-lg h-10 px-4 border"
        aria-invalid={errors[content.name] ? "true" : "false"}
        {...register(content.name)}
      >
        <option value="">Select Currency</option>
        {currencies.map((item) => {
          return (
            <option key={item.name} value={item.code}>
              {item.symbol} ({item.name})
            </option>
          );
        })}
      </select>
      <p className="text-red-500 text-xs">{errors[content.name]?.message}</p>
    </div>
  );
}
