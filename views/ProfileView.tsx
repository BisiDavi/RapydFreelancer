import ProfileForm from "@/components/form/ProfileForm";
import useAuth from "@/hooks/useAuth";

export default function ProfileView() {
  const { authDetails } = useAuth();

  const auth = authDetails();
  return (
    <div className="w-full flex flex-col">
      <p className="font-thin">
        Welcome to RapydFreelancers, you need to update your profile, complete
        your KYC, this will enable you create your wallet and eligible to post
        jobs.
      </p>
      <ProfileForm />
    </div>
  );
}
