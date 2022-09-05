import formContent from "@/json/forms/post-job.json";
import displayFormElement from "@/lib/displayFormElement";

interface Props {
  type: "price" | "durationModel";
}

export default function PostJobFormElement({ type }: Props) {
  return (
    <div className="price-view flex items-center">
      {formContent[type].map((formElementContent, index) => {
        const marginStyle =
          Number(formContent.price.length - 1) !== index ? "mr-4" : "";
        return (
          <div key={index} className={`w-1/2 ${marginStyle}`}>
            {displayFormElement(formElementContent)}
          </div>
        );
      })}
    </div>
  );
}
