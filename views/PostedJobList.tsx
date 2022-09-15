import { jobType } from "@/types";

interface Props {
  jobs: jobType[];
}

export default function PostedJobList({ jobs }:Props) {
  return (
    <ul>
      {jobs.map((jobItem) => {
        const postedOn = new Date(jobItem.createdAt).toDateString();
        const bids =
          jobItem.bids.length > 1
            ? `${jobItem.bids.length} bids`
            : `${jobItem.bids.length} bid`;

        return (
          <li key={jobItem.id} className="my-3 rounded-lg bg-white px-4 py-2">
            <h6 className="font-bold">{jobItem.title}</h6>
            <p>{jobItem.description}</p>
            <p>Price: ${jobItem.price}</p>
            <ul className="lg:flex mb-2 grid grid-cols-2 gap-2">
              {jobItem.skills.map((skill) => ( 
                <li
                  key={skill.value}
                  className="font-light text-sm border px-2 py-1 flex items-center justify-center lg:px-2 rounded text-blue-400 hover:bg-blue-800 hover:text-white"
                >
                  {skill.label}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <p>Posted by: {jobItem.user.displayName}</p>
              <p>Posted on: {postedOn}</p>
            </div>
            <p>Bids : {bids} </p>
          </li>
        );
      })}
    </ul>
  );
}
