import type { elementType } from "@/types/form-types";

export default function Media({ content }: elementType) {
  return (
    <div className="form input border border-dotted py-4 px-3 rounded-lg">
      <label htmlFor={content.name}>{content.label}</label>
      <input
        id={content.name}
        placeholder={content.placeholder}
        className="rounded-lg px-10 border"
        type="submit"
      />
    </div>
  );
}
