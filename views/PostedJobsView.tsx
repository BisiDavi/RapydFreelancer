import { useQuery } from "@tanstack/react-query";

import { getBidsFromPostedJobs } from "@/request/getRequest";
import useAuth from "@/hooks/useAuth";
import SpinnerRipple from "@/components/loader/SpinnerRipple";

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
          <p className="text-center font-bold">Fetching bids...</p>
        </div>
      ) : (
        <div className="bids">
          <h4 className="font-bold text-xl">
            Posted Jobs ({data?.data.length})
          </h4>
        </div>
      )}
    </div>
  );
}
