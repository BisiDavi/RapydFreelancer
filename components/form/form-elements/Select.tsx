import { useFormContext } from "react-hook-form";

import type { elementType } from "@/types/form-types";

export default function Select({ content }: elementType) {
  const {
    register,
    formState: { errors },
  }: any = useFormContext();

  return (
    <div className="form flex flex-col relative my-2">
      <label htmlFor={content.name} className="font-bold my-1 text-lg">
        {content.label}
      </label>
      <select
        id={content.name}
        className="rounded-lg h-10 px-4 border"
        aria-invalid={errors[content.name] ? "true" : "false"}
        {...register(content.name)}
      >
        {content.options?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
      <p className="text-red-500 text-xs">{errors[content.name]?.message}</p>
    </div>
  );
}
