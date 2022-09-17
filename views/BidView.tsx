import { SpinnerLoader } from "@/components/loader/SpinnerRipple";
import { jobType } from "@/types";
import Button from "@/components/UI/Button";
import usePostedJobs from "@/hooks/usePostedJobs";

export default function BidView() {
  const { data, status } = usePostedJobs();

  return (
    <div>
      {status === "error" ? (
        "error fetching bids"
      ) : status === "loading" ? (
        <SpinnerLoader loadingText="Fetching bids..." />
      ) : (
        <div className="bids">
          <h4 className="font-medium text-xl">
            Posted Jobs ({data?.data.length}),
            <span className="font-bold ml-1">click to view bids</span>
          </h4>
          <ul>
            {data.data.map((item: jobType) => {
              const bids =
                item.bids.length > 1
                  ? `${item.bids.length} bids`
                  : `${item.bids.length} bid`;
              const bidClassname =
                item.bids.length > 1 ? "text-green-500" : "text-red-500";
              return (
                <li
                  key={item._id}
                  className="my-3 rounded-lg bg-white px-4 py-2"
                >
                  <div className="top flex items-center justify-between font-semibold text-lg">
                    <h4>{item.title}</h4>
                    <p>${item.price}</p>
                  </div>
                  <p className={bidClassname}>Bids: {bids}</p>
                  {item.bids.length > 0 && (
                    <Button
                      className="border border-blue-500 hover:bg-blue-500 hover:text-white px-4 py-1 rounded-lg flex justify-center mx-auto"
                      text="View Bids"
                    />
                  )}
                  <div className="bid-view"></div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
