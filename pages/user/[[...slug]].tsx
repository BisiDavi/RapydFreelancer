import { useRouter } from "next/router";

import DefaultLayout from "@/layout/DefaultLayout";
import displayUserSection from "@/components/tab/displayUserSection";
import ProfileSidebar from "@/components/sidebar/ProfileSidebar";
import useAuth from "@/hooks/useAuth";
import greetUser from "@/lib/greetUser";

export default function UserPage() {
  const router = useRouter();
  const { slug }: any = router.query;
  const slugItem: string = slug ? slug[0] : "";

  console.log("router.query", router.query);

  const { authDetails } = useAuth();

  const auth = authDetails();

  return (
    <DefaultLayout title="Your Profile">
      <section className="container flex items-start mx-auto my-10">
        <ProfileSidebar />
        <div className="content w-4/5  p-6 item-start ml-4 rounded h-600 bg-gray-100">
          <h3 className="text-xl font-bold mb-4">
            {greetUser()}, {auth?.displayName}
          </h3>
          {slugItem && displayUserSection(slugItem)}
        </div>
      </section>
    </DefaultLayout>
  );
}
