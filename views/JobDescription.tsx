/* eslint-disable @next/next/no-img-element */
import { formatJobDuration } from "@/lib/formatDuration";
import { jobType } from "@/types";

interface Props {
  job: jobType;
}

export default function JobDescription({ job }: Props) {
  const postedOn = new Date(job.createdAt).toDateString();

  const formatPeriod = job.durationPeriod > 1 ? "s" : "";

  const estimatedDuration = `${job.durationPeriod} ${formatJobDuration(
    job.duration
  )}${formatPeriod}`;

  return (
    <>
      <p className="text-lg my-4">{job.description}</p>
      <div className="lg:flex  items-center my-4 mb-5">
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
      <p className="text-lg my-1">
        <span className="font-bold mr-1">Estimated Duration:</span>
        {estimatedDuration}
      </p>
      <p className="text-lg my-1">
        <span className="font-bold mr-1">Posted on:</span> {postedOn}
      </p>
      {job.user && (
        <p className="text-lg my-1">
          <span className="font-bold mr-1">Posted By:</span>{" "}
          {job.user.displayName}
        </p>
      )}
      {job?.media && (
        <div className="text-lg my-4">
          <span className="font-bold mr-1">Attached Document:</span>
          {job.media.map((item, index) => (
            <img src={item} key={index} alt="attached document" />
          ))}
        </div>
      )}
      <hr className="my-4" />
    </>
  );
}
