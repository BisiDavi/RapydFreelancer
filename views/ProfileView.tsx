import Link from "next/link";

import ProfileForm from "@/components/form/ProfileForm";
import IssueVirtualAccountForm from "@/components/form/FundAccountForm";
import AccountDetailsView from "@/views/AccountDetailsView";
import useHeader from "@/hooks/useHeader";
import { SpinnerLoader } from "@/components/loader/SpinnerRipple";
import Button from "@/components/UI/Button";

export default function ProfileView() {
  const { userProfile } = useHeader();
  const { data, status } = userProfile;
  const user = status === "success" ? data?.data[0] : null;

  return (
    <div className="w-full flex flex-col">
      {user && (
        <ul className="profile-details my-1">
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
            <span className="font-bold">Connects:</span> 🏵 {user.connects}{" "}
            Connect(s)
          </li>
        </ul>
      )}
      <div className="mb-4">
        <span className="font-bold mr-1">Note:</span>The more connect you have,
        the more jobs you can bid on, click here to
        <Link href="/user/account">
          <a className="font-bold text-red-500 ml-1">buy connect</a>
        </Link>
      </div>
      <p className="font-thin">
        Welcome to RapydFreelancers, you need to update your profile, complete
        your KYC, this will enable you create your wallet and eligible to post
        jobs.
      </p>
      {status === "error" ? (
        "error fetching user profile"
      ) : status === "loading" ? (
        <SpinnerLoader loadingText="Fetching user profile" />
      ) : !user?.ewallet ? (
        status === "success" && <ProfileForm />
      ) : (
        user?.ewallet && <AccountDetailsView walletId={user?.ewallet} />
      )}
      {user?.address && <IssueVirtualAccountForm ewallet={user?.ewallet} />}
    </div>
  );
}
