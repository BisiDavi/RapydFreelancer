import type { elementType } from "@/types/form-types";

export default function Input({ content }: elementType) {
  return (
    <div className="form input my-6">
      <label htmlFor={content.name}>{content.label}</label>
      <input
        id={content.name}
        placeholder={content.placeholder}
        type={content.elementType}
        className="rounded-lg h-20 px-10 border"
      />
    </div>
  );
}
