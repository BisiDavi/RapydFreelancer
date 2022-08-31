import type { elementType } from "@/types/form-types";

export default function Textarea({ content }: elementType) {
  return (
    <div className="form flex flex-col my-4">
      <label htmlFor={content.name} className="text-lg font-bold my-2">{content.label}</label>
      <textarea
        id={content.name}
        placeholder={content.placeholder}
        className="rounded-lg p-4 border"
        rows={6}
      ></textarea>
    </div>
  );
}
