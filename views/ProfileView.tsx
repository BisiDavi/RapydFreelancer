import { useQueryClient } from "@tanstack/react-query";

import ProfileForm from "@/components/form/ProfileForm";
import IssueVirtualAccountForm from "@/components/form/IssueVirtualAccountForm";
import AccountDetailsView from "@/views/AccountDetailsView";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const userData: any = queryClient.getQueryData(["getUserProfile"]);
  const user = userData?.data ? userData?.data[0] : null;
  console.log("user", user);

  return (
    <div className="w-full flex flex-col">
      <p className="font-thin">
        Welcome to RapydFreelancers, you need to update your profile, complete
        your KYC, this will enable you create your wallet and eligible to post
        jobs.
      </p>
      {!user?.ewallet ? <ProfileForm /> : <AccountDetailsView />}

      {user?.address && <IssueVirtualAccountForm />}
    </div>
  );
}
