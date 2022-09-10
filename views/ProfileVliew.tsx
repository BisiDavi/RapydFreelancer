import ProfileForm from "@/components/form/ProfileForm";
import useAuth from "@/hooks/useAuth";
import greetUser from "@/lib/greetUser";

export default function ProfileVliew() {
  const { authDetails } = useAuth();

  const auth = authDetails();
  return (
    <div className="w-full flex flex-col p-6 item-start ml-4 rounded h-500 bg-gray-100">
      <h3 className="text-xl font-bold flex  text-right">
        {greetUser()}, {auth?.displayName}
      </h3>
      <p className="mt-4">
        Welcome to RapydFreelancers, you need to update your profile, complete
        your KYC, this will enable you create your wallet and eligible to post
        jobs.
      </p>
      <ProfileForm />
    </div>
  );
}
