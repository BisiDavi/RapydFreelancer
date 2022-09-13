import useMediaUpload from "@/hooks/useMediaUpload";
import type { elementType } from "@/types/form-types";

interface Props {
  content: elementType["content"];
  big?: boolean;
}

export default function Media({ content, big }: Props) {
  const { uploadMedia } = useMediaUpload();
  const labelClassname = big ? "lg:text-lg text-sm" : "lg:text-xs text-md";

  function onClickHandler(e: any) {
    console.log("(e.target.files", e.target.files[0]);
    if (e.target.files) {
      return uploadMedia(e.target.files[0]);
    }
  }

  return (
    <div className="form input flex-col lg:flex-row border-4 border-dotted mt-4  flex items-center justify-between py-2 px-3 rounded-lg">
      <input
        id={content.name}
        placeholder={content.placeholder}
        className="rounded-lg px-10 border-2 h-8 w-full my-2 lg:my-0 lg:w-1/3 mx-4"
        type="file"
        onChange={onClickHandler}
        accept="image/* , application/pdf"
      />
      <label
        htmlFor={content.name}
        className={`${labelClassname} w-full lg:w-2/3`}
      >
        {content.label}
      </label>
    </div>
  );
}
