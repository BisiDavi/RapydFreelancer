import { useQuery } from "@tanstack/react-query";

import ProfileForm from "@/components/form/ProfileForm";
import { useAppSelector } from "@/hooks/useRedux";
import { getWallet } from "@/request/getRequest";

export default function ProfileView() {
  const { isProfileFormFilled } = useAppSelector((state) => state.form);
  // const { data, status } = useQuery(["getWallet"],() => getWallet("ewallet_01e695aea411dad4e75ebf3ddd5fd4ff"));

  // console.log("data", data?.data);

  return (
    <div className="w-full flex flex-col">
      <p className="font-thin">
        Welcome to RapydFreelancers, you need to update your profile, complete
        your KYC, this will enable you create your wallet and eligible to post
        jobs.
      </p>
      {!isProfileFormFilled && <ProfileForm />}
    </div>
  );
}
