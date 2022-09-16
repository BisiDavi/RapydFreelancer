import { useQueryClient } from "@tanstack/react-query";

import ProfileForm from "@/components/form/ProfileForm";
import IssueVirtualAccountForm from "@/components/form/IssueVirtualAccountForm";
import AccountDetailsView from "@/views/AccountDetailsView";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const userData: any = queryClient.getQueryData(["getUserProfile"]);
  const user = userData?.data ? userData?.data[0] : null;

  return (
    <div className="w-full flex flex-col">
      <p className="font-thin">
        Welcome to RapydFreelancers, you need to update your profile, complete
        your KYC, this will enable you create your wallet and eligible to post
        jobs.
      </p>
      {user && (
        <ul className="profile-details mt-4">
          <li className="font-bold">Profile Details</li>
          <li>
            <span className="font-bold">Name:</span> {user.name}
          </li>
          <li>
            <span className="font-bold">Email:</span> {user.email}
          </li>
          <li>
            <span className="font-bold">Role:</span> {user.role}
          </li>
          <li>
            <span className="font-bold">Connects:</span> {user.connects}{" "}
            Connect(s)
          </li>
        </ul>
      )}
      {!user?.ewallet ? <ProfileForm /> : <AccountDetailsView />}

      {user?.address && <IssueVirtualAccountForm />}
    </div>
  );
}
