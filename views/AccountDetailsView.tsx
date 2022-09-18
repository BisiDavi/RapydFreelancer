import { useQuery } from "@tanstack/react-query";

import { getWallet } from "@/request/getRequest";
import SpinnerRipple from "@/components/loader/SpinnerRipple";

interface Props {
  walletId: string;
}

export default function AccountDetailsView({ walletId }: Props) {
  const { data, status } = useQuery(["getWallet"], () => getWallet(walletId));

  console.log("data-status", data?.data);

  return (
    <>
      <p className="text-xl my-2">
        <span className="text-2xl">🎉</span> Congrats, you now have a wallet
        with us
      </p>
      <h2 className="text-xl">Account Details</h2>
      {status === "error" ? (
        "unable to fetch account details"
      ) : status === "loading" ? (
        <div className="view h-14 mx-auto flex justify-center items-center w-full">
          <SpinnerRipple centerRipple />
        </div>
      ) : (
        <div className="account-view flex items-center my-2 shadow py-4 px-6 rounded-full bg-white justify-between">
          <p>Wallet ID: {data?.data.id}</p>
          <p>
            Status:{" "}
            <span className="bg-green-500 px-2 text-sm  py-0.5 rounded-full ml-1 text-white">
              Active
            </span>
          </p>
          <p>Category:{data.data.category ? data.data.category : "nill"}</p>
          <p>Type:{data.data.type}</p>
        </div>
      )}
    </>
  );
}
