import SpinnerRipple from "@/components/loader/SpinnerRipple";
import PostedJobList from "@/views/PostedJobList";
import usePostedJobs from "@/hooks/usePostedJobs";

export default function PostedJobsView() {
  const { data, status } = usePostedJobs();

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
          <PostedJobList jobs={data?.data} />
        </div>
      )}
    </div>
  );
}
