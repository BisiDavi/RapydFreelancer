import ProfileForm from "@/components/form/ProfileForm";
import { useAppSelector } from "@/hooks/useRedux";

export default function ProfileView() {
  const { isProfileFormFilled } = useAppSelector((state) => state.form);

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
