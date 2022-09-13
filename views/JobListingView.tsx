import { useRouter } from "next/router";

import Button from "@/components/UI/Button";
import JobListingSidebar from "@/components/sidebar/JobListingSidebar";
import toSlug from "@/lib/toSlug";
import jobTipContent from "@/json/post-job.json";
import JobDescription from "@/views/JobDescription";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/redux/store";
import { updateModal } from "@/redux/ui-slice";
import type { jobType } from "@/types";

interface Props {
  job: jobType;
}

export default function JobListingView({ job }: Props) {
  const skillId = toSlug(job.skills[0].label);
  const title = toSlug(job.title);
  const jobTips = jobTipContent.jobTips;
  const { authDetails } = useAuth();
  const auth = authDetails();
  const dispatch = useAppDispatch();
  const router = useRouter();

  function bidJobHandler() {
    if (auth === null) {
      return dispatch(updateModal("auth-modal"));
    } else {
      return router.push(`/bid/${skillId}/${title}?id=${job._id}`);
    }
  }

  return (
    <div className="content w-full lg:flex-row flex-col mb-8 mt-4 flex justify-between">
      <div className="details mx-4 lg:mx-0 lg:w-3/4 shadow p-4 px-8 bg-white">
        <JobDescription job={job} />
        <div className="view">
          <div className="group flex flex-col lg:flex-row items-center justify-between">
            <h3 className="text-xl">
              Are you interested in this Job? Offer to work on this job now!
            </h3>
            <Button
              text="Bid on this Job"
              className="bg-red-500 font-bold text-xl text-white py-2 px-6 my-4 hover:opacity-80"
              onClick={bidJobHandler}
            />
          </div>
          <p className="text-xl underline mb-1">Tips to win jobs:</p>
          <ul>
            {jobTips.map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ul>
        </div>
      </div>
      <JobListingSidebar email={job.user.email} title={job.title} />
    </div>
  );
}
