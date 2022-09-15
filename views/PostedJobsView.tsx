import { useQuery } from "@tanstack/react-query";

import { getBidsFromPostedJobs } from "@/request/getRequest";
import useAuth from "@/hooks/useAuth";
import SpinnerRipple from "@/components/loader/SpinnerRipple";
import type { jobType } from "@/types";

export default function PostedJobsView() {
  const { authDetails } = useAuth();
  const auth: any = authDetails();

  const { data, status } = useQuery(["getBidsFromPostedJobs"], () =>
    getBidsFromPostedJobs(auth?.email)
  );

  return (
    <div>
      {status === "error" ? (
        "error fetching bids"
      ) : status === "loading" ? (
        <div className="flex flex-col">
          <div className="ripple h-20 flex justify-center items-center">
            <SpinnerRipple centerRipple />
          </div>
          <p className="text-center font-bold">Fetching posted jobs...</p>
        </div>
      ) : (
        <div className="jobs">
          <h4 className="font-bold text-xl">
            Posted Jobs ({data?.data.length})
          </h4>
          <ul>
            {data.data.map((jobItem: jobType) => (
              <li key={jobItem.id} className="my-3">
                <h6>{jobItem.title}</h6>
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
