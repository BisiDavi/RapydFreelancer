import { useFormContext } from "react-hook-form";

import type { elementType } from "@/types/form-types";

export default function PriceRange({ content }: elementType) {
  const {
    register,
    formState: { errors },
  }: any = useFormContext();

  return (
    <div className="form-group">
      <div className="form flex flex-col relative my-2">
        <label htmlFor={content.name} className="font-bold my-1 text-lg">
          {content.label}
        </label>
        <div className="group flex items-center">
          <input
            id="min"
            placeholder="min"
            type="text"
            className="rounded-lg h-10 px-4 border w-1/2 mr-4"
            aria-invalid={errors["min"] ? "true" : "false"}
            {...register("min")}
          />
          <input
            id="max"
            placeholder="max"
            type="text"
            className="rounded-lg h-10 px-4 border w-1/2"
            aria-invalid={errors["max"] ? "true" : "false"}
            {...register("max")}
          />
        </div>
      </div>
    </div>
  );
}
