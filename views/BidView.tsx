import { useQuery } from "@tanstack/react-query";

import { getBidsFromPostedJobs } from "@/request/getRequest";
import useAuth from "@/hooks/useAuth";
import SpinnerRipple from "@/components/loader/SpinnerRipple";

export default function BidView() {
  const { authDetails } = useAuth();
  const auth: any = authDetails();

  const { data, status } = useQuery(["getBidsFromPostedJobs"], () =>
    getBidsFromPostedJobs(auth?.email)
  );

  console.log("bids", data?.data);
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
          <h4 className="font-medium text-xl">
            Posted Jobs ({data?.data.length}),
            <span className="font-bold ml-1">click on jobs to view bids</span>
          </h4>
        </div>
      )}
    </div>
  );
}
