import type { elementType } from "@/types/form-types";

export default function Media({ content }: elementType) {
  return (
    <div className="form input border-4 border-dotted mt-4  flex items-center justify-between py-2 px-3 rounded-lg">
      <input
        id={content.name}
        placeholder={content.placeholder}
        className="rounded-lg px-10 border-2 h-8 w-1/3 mx-4"
        type="file"
      />
      <label htmlFor={content.name} className="text-xs w-2/3">
        {content.label}
      </label>
    </div>
  );
}
