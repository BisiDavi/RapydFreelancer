import type { elementType } from "@/types/form-types";

export default function Textarea({ content }: elementType) {
  return (
    <div className="form input my-6">
      <label htmlFor={content.name}>{content.label}</label>
      <textarea
        id={content.name}
        placeholder={content.placeholder}
        className="rounded-lg px-10 border"
        rows={6}
      ></textarea>
    </div>
  );
}
