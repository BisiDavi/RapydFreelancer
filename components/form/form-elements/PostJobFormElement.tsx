import formContent from "@/json/post-job.json";
import displayFormElement from "@/lib/displayFormElement";
import spaceRow from "@/lib/spaceRow";

interface Props {
  type: "price" | "durationModel";
}

export default function PostJobFormElement({ type }: Props) {
  return (
    <div className="price-view flex items-center">
      {formContent[type].map((formElementContent, index) => {
        const marginStyle = spaceRow(formContent.price, index);
        return (
          <div key={index} className={`w-1/2 ${marginStyle}`}>
            {displayFormElement(formElementContent)}
          </div>
        );
      })}
    </div>
  );
}
