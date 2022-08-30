interface Props {
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

export default function JobListCard({ content }: Props) {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-start">
      <div className="left w-4/5">
        <div className="top flex items-center">
          <h4 className="font-medium text-lg">{content.title}</h4>{" "}
          <p className="ml-2">days left</p>
        </div>
        <p className="w-11/12 break-words">{content.description}</p>
        <ul className="flex">
          {content.tags.map((tag) => (
            <li key={tag} className="font-light text-blue-400 mr-4">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="right w-1/5">
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
