import { useQuery } from "@tanstack/react-query";

import ProfileForm from "@/components/form/ProfileForm";
import { useAppSelector } from "@/hooks/useRedux";
import { getWallet } from "@/request/getRequest";
import IssueVirtualAccountForm from "@/components/form/IssueVirtualAccountForm";

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
      <p>
        <span className="text-3xl">✌🏼</span> Congrats, you now have a wallet
        with us
      </p>
      <h2 className="text-xl">Account Details</h2>
      
      <p className="font-semibol mt-4">
        Open an account with us to make you wallet active, fill the form below
      </p>

      <IssueVirtualAccountForm />
    </div>
  );
}
