import { useFormContext } from "react-hook-form";
import type { elementType } from "@/types/form-types";

export default function InputSelect({ content }: elementType) {
  const {
    register,
    formState: { errors },
  }: any = useFormContext();
  return (
    <div className="form-group w-full">
      <div className="form flex flex-col relative my-2">
        <label htmlFor={content.name} className="font-bold my-1 text-lg">
          {content.label}
        </label>
        <div className="flex w-full">
          <div className="mr-4 w-1/4">
            <input
              id={content.name}
              placeholder={content.placeholder}
              type={content.elementType}
              className="rounded-lg h-10 px-4 border w-full"
              aria-invalid={errors[content.name] ? "true" : "false"}
              {...register(content.name)}
            />
          </div>
          <div className="select w-1/2">
            <select
              id={content.name}
              className="rounded-lg h-10 px-4 border"
              aria-invalid={errors[content.name] ? "true" : "false"}
              {...register(content.name2)}
            >
              {content.options?.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-red-500 text-xs">
          {errors[content.name]?.message}
          {content.name2 && errors[content.name2]?.message}
        </p>
      </div>
    </div>
  );
}
