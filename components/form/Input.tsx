import type { elementType } from "@/types/form-types";

export default function Input({ content }: elementType) {
  return (
    <div className="form flex flex-col my-6">
      <label htmlFor={content.name} className="text-lg font-bold my-2">
        {content.label}
      </label>
      <input
        id={content.name}
        placeholder={content.placeholder}
        type={content.elementType}
        className="rounded-lg h-12 px-4 border"
      />
    </div>
  );
}
