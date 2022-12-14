/* eslint-disable @next/next/no-img-element */
import { skillType } from "@/types/form-types";

interface ListElementProps {
  title: string;
  value?: string;
  mapItem?: skillType;
  mapMedia?: string[];
}

export default function ListElement({
  title,
  value,
  mapItem,
}: ListElementProps) {
  return (
    <li className="flex items-center my-1">
      <span className="font-bold mr-1">{title}:</span>
      {mapItem ? (
        <div className="group flex items-center">
          {mapItem.map((skill) => (
            <li key={skill.value} className="border border-blue-500 mx-1 px-1 rounded-md">
              {" "}
              {skill.label}
            </li>
          ))}
        </div>
      ) : (
        value
      )}
    </li>
  );
}

export function ListElementMedia({ title, mapMedia }: ListElementProps) {
  return (
    <li className="flex items-center">
      <span className="font-bold mr-1">{title}:</span>
      {mapMedia?.map((mediaItem) => (
        <div key={mediaItem} className="group flex">
          <img src={mediaItem} alt="job document" />
        </div>
      ))}
    </li>
  );
}
