import formContent from "@/json/post-job.json";
import displayFormElement from "@/lib/displayFormElement";
import spaceRow from "@/lib/spaceRow";

interface Props {
  type: "price" | "durationModel";
}

export default function PostJobFormElement({ type }: Props) {
  return (
    <div className="price-view flex lg:flex-row flex-col items-center">
      {formContent[type].map((formElementContent, index) => {
        const marginStyle = spaceRow(formContent.price, index);
        return (
          <div key={index} className={`lg:w-1/2 w-full ${marginStyle}`}>
            {displayFormElement(formElementContent)}
          </div>
        );
      })}
    </div>
  );
}
