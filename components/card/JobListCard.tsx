interface Props {
  showBorder: boolean;
  content: {
    title: string;
    description: string;
    minPrice?: number;
    maxPrice?: number;
    duration?: string;
    bids: number;
    tags: string[];
    price?: number;
    createdAt: string;
    verified?: boolean;
    type?: string;
  };
}

export default function JobListCard({ content, showBorder }: Props) {
  const borderClassname = showBorder ? "border-b" : "";
  return (
    <div
      className={`bg-white ${borderClassname} flex py-3 items-start hover:bg-gray-100 justify-between px-2`}
    >
      <div className="left w-4/5">
        <div className="top flex items-center">
          <h4 className="font-medium text-lg">{content.title}</h4>{" "}
          <p className="ml-2">days left</p>
        </div>
        <p className="break-words my-4">{content.description}</p>
        <ul className="flex mb-2">
          {content.tags.map((tag) => (
            <li key={tag} className="font-light text-blue-400 mr-4">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="right w-1/5 flex flex-col items-end justify-items-end">
        <div className="top">
          <h6 className="font-bold">
            {content?.price
              ? `$${content.price} ${content?.type === "hourly" ? "/ hr" : ""}`
              : `$${content.minPrice} - $${content.maxPrice}`}
          </h6>
        </div>
        <p>{content.bids} bids</p>
      </div>
    </div>
  );
}