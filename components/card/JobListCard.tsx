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
        <div className="left w-full">
          <div className="top flex items-center justify-between">
            <h4 className="font-medium text-lg">{content.title}</h4>
            <h6 className="font-bold">
              {content?.price
                ? `$${content.price} ${
                    content?.type === "hourly" ? "/ hr" : ""
                  }`
                : `$${content.minPrice} - $${content.maxPrice}`}
            </h6>
          </div>
          <div className="bottom flex lg:items-center justify-between">
            <div className="text">
              <p className="break-words my-4">{content.description}</p>
              <ul className="lg:flex mb-2 grid grid-cols-2 gap-2">
                {content.skills.map((skill) => (
                  <li
                    key={skill.value}
                    className="font-light text-sm border px-2 py-1 flex items-center justify-center lg:px-2 rounded text-blue-400 hover:bg-blue-800 hover:text-white"
                  >
                    {skill.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bid hidden lg:flex">
              <Button
                text="Bid"
                className="bg-red-500 text-white w-20 h-8 my-4 justify-center items-center flex hover:bg-red-600 font-bold"
                href={`/bid/${skillId}/${title}?id=${content._id}`}
              />
              {content.bids && <p>{content.bids} bids</p>}
            </div>
          </div>
          <div className="bid lg:hidden">
            <Button
              text="Bid"
              className="bg-red-500 text-white mx-auto w-20 h-8 my-4 justify-center items-center flex hover:bg-red-600 font-bold"
              href={`/bid/${skillId}/${title}?id=${content._id}`}
            />
            {content.bids && <p>{content.bids} bids</p>}
          </div>
        </div>
      </a>
    </Link>
  );
}
