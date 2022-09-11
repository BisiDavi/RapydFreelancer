import { jobType } from "@/types";

interface Props {
  job: jobType;
}

export default function JobDescription({ job }: Props) {
  const postedOn = new Date(job.createdAt).toDateString();

  return (
    <>
      <p className="text-lg my-4">{job.description}</p>
      <ul className="flex items-center my-4">
        <span className="font-bold">Skills:</span>
        {job.skills.map((skill) => (
          <li
            key={skill.value}
            className="mx-2 border border-blue-500 px-2 rounded-md hover:text-white hover:bg-blue-500"
          >
            {skill.label}
          </li>
        ))}
      </ul>
      <p className="text-lg my-2">
        <span className="font-bold mr-1">Posted on:</span> {postedOn}
      </p>
      <hr className="my-4" />
    </>
  );
}
