import useMediaUpload from "@/hooks/useMediaUpload";
import type { elementType } from "@/types/form-types";

export default function Media({ content }: elementType) {
  const { uploadMedia } = useMediaUpload();

  function onClickHandler(e: any) {
    console.log("(e.target.files", e.target.files[0]);
    if (e.target.files) {
      return uploadMedia(e.target.files[0]);
    }
  }

  return (
    <div className="form input border-4 border-dotted mt-4  flex items-center justify-between py-2 px-3 rounded-lg">
      <input
        id={content.name}
        placeholder={content.placeholder}
        className="rounded-lg px-10 border-2 h-8 w-1/3 mx-4"
        type="file"
        onChange={onClickHandler}
        accept="image/* , application/pdf"
      />
      {/* <Button onClick={} text="Upload" /> */}
      <label htmlFor={content.name} className="text-xs w-2/3">
        {content.label}
      </label>
    </div>
  );
}
