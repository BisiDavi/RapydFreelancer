import ProfileForm from "@/components/form/ProfileForm";
import { useAppSelector } from "@/hooks/useRedux";
import IssueVirtualAccountForm from "@/components/form/IssueVirtualAccountForm";
import AccountDetailsView from "@/views/AccountDetailsView";

export default function ProfileView() {
  const { profile } = useAppSelector((state) => state.user);

  return (
    <div className="w-full flex flex-col">
      <p className="font-thin">
        Welcome to RapydFreelancers, you need to update your profile, complete
        your KYC, this will enable you create your wallet and eligible to post
        jobs.
      </p>
      {!profile?.ewallet ? <ProfileForm /> : <AccountDetailsView />}

      {profile?.address && <IssueVirtualAccountForm />}
    </div>
  );
}
