import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "@/request/getRequest";
import useAuth from "@/hooks/useAuth";
import { updateUserProfile } from "@/redux/user-slice";
import { useAppSelector } from "@/hooks/useRedux";
import { useAppDispatch } from "@/redux/store";
import SpinnerRipple from "@/components/loader/SpinnerRipple";


export default function BidView() {
  const { authDetails } = useAuth();
  const auth: any = authDetails();
  const dispatch = useAppDispatch();

  const { messages, profile } = useAppSelector((state) => state.user);

  const { data, status } = useQuery(
    ["getUserProfile"],
    () => getUserProfile(auth?.email),
    {
      enabled: !!auth?.email && profile === null,
      onSuccess(data) {
        if (!profile) {
          dispatch(updateUserProfile(data?.data[0]));
        }
      },
    }
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
        ""
      )}
    </div>
  );
}
