import { useQuery } from "@tanstack/react-query";

import ProfileForm from "@/components/form/ProfileForm";
import { useAppSelector } from "@/hooks/useRedux";
import { getWallet } from "@/request/getRequest";
import IssueVirtualAccountForm from "@/components/form/IssueVirtualAccountForm";
import SpinnerRipple from "@/components/loader/SpinnerRipple";

export default function ProfileView() {
  const { isProfileFormFilled } = useAppSelector((state) => state.form);
  const { walletId } = useAppSelector((state) => state.user);
  const { data, status } = useQuery(["getWallet"], () => getWallet(walletId), {
    enabled: !!walletId,
  });

  console.log("data", data?.data);

  return (
    <div className="w-full flex flex-col">
      <p className="font-thin">
        Welcome to RapydFreelancers, you need to update your profile, complete
        your KYC, this will enable you create your wallet and eligible to post
        jobs.
      </p>
      {!isProfileFormFilled && <ProfileForm />}
      <p className="text-xl my-2">
        <span className="text-2xl">🎉</span> Congrats, you now have a wallet
        with us
      </p>
      <h2 className="text-xl">Account Details</h2>
      {status === "error" ? (
        "unable to fetch account details"
      ) : status === "loading" ? (
        <div className="view h-20 mx-auto flex justify-center items-center w-full">
          <SpinnerRipple centerRipple />
        </div>
      ) : (
        <div className="account-view flex items-center my-2 shadow py-4 px-6 rounded-full bg-white justify-between">
          <p>Wallet ID: {data?.data.id}</p>
          <p>
            Status:{" "}
            <span className="bg-green-500 px-2 text-sm  py-0.5 rounded-full ml-1 text-white">
              {" "}
              Active
            </span>
          </p>
          <p>Category:{data.data.category ? data.data.category : "nill"}</p>
          <p>Type:{data.data.type}</p>
        </div>
      )}
      <p className="font-semibol mt-4">
        Open an account with us to make you wallet active, fill the form below
      </p>

      <IssueVirtualAccountForm />
    </div>
  );
}
