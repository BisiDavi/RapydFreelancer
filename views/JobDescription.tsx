import { jobType } from "@/types";

interface Props {
  job: jobType;
}

export default function JobDescription({ job }: Props) {
  const postedOn = new Date(job.createdAt).toDateString();

  return (
    <>
      <p className="text-lg my-4">{job.description}</p>
      <div className="lg:flex  items-center my-4">
        <span className="font-bold">Skills:</span>
        <ul className="group lg:flex grid grid-cols-2 gap-2">
          {job.skills.map((skill) => (
            <li
              key={skill.value}
              className="lg:mx-2 flex items-center justify-center border border-blue-500 px-2 rounded-md hover:text-white hover:bg-blue-500"
            >
              {skill.label}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-lg my-2">
        <span className="font-bold mr-1">Posted on:</span> {postedOn}
      </p>
      <hr className="my-4" />
    </>
  );
}
