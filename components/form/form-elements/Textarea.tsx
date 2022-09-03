import { useFormContext } from "react-hook-form";
import type { elementType } from "@/types/form-types";

export default function Textarea({ content }: elementType) {
  const {
    register,
    formState: { errors },
  }: any = useFormContext();

  return (
    <div className="form flex flex-col my-1">
      <label htmlFor={content.name} className="text-lg font-bold my-2">
        {content.label}
      </label>
      <textarea
        id={content.name}
        placeholder={content.placeholder}
        className="rounded-lg p-4 border"
        rows={3}
        {...register(content.name)}
      ></textarea>
      <p className="text-red-500 p-0 mt-1 text-xs">
        {errors[content.name]?.message}
      </p>
    </div>
  );
}
