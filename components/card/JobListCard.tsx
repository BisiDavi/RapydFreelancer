import toSlug from "@/lib/toSlug";
import Link from "next/link";
import Button from "../UI/Button";

interface Props {
  showBorder: boolean;
  content: {
    _id: string;
    title: string;
    description: string;
    minPrice?: number;
    maxPrice?: number;
    duration?: string;
    bids: number;
    skills: { label: string; value: string }[];
    price?: number;
    id: string;
    createdAt: string;
    verified?: boolean;
    type?: string;
  };
}

export default function JobListCard({ content, showBorder }: Props) {
  const borderClassname = showBorder ? "border-b" : "";
  const skillId = toSlug(content.skills[0].label);
  const title = toSlug(content.title);
  return (
    <Link
      href={`/jobs/projects/${content.skills[0].label}/${content.id}`}
      passHref
    >
      <a
        className={`bg-white ${borderClassname} flex py-3 items-start hover:bg-gray-100 justify-between px-2`}
      >
        <div className="left w-4/5">
          <div className="top flex items-center">
            <h4 className="font-medium text-lg">{content.title}</h4>
          </div>
          <p className="break-words my-4">{content.description}</p>
          <ul className="flex mb-2">
            {content.skills.map((skill) => (
              <li
                key={skill.value}
                className="font-light text-sm border px-2 rounded text-blue-400 hover:bg-blue-800 hover:text-white  mr-4"
              >
                {skill.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="right w-1/5 flex flex-col items-end justify-items-end">
          <div className="top">
            <h6 className="font-bold">
              {content?.price
                ? `$${content.price} ${
                    content?.type === "hourly" ? "/ hr" : ""
                  }`
                : `$${content.minPrice} - $${content.maxPrice}`}
            </h6>
          </div>
          <Button
            text="Bid"
            className="bg-red-500 text-white w-20 h-8 my-4 justify-center items-center flex hover:bg-red-600 font-bold"
            href={`/bid/${skillId}/${title}?id=${content._id}`}
          />
          {content.bids && <p>{content.bids} bids</p>}
        </div>
      </a>
    </Link>
  );
}
