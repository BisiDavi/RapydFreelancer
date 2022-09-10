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
      <p>Welcome to RapydFreelancers, you need to update your profile,</p>
    </div>
  );
}
