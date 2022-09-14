/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRouter } from "next/router";

import DefaultLayout from "@/layout/DefaultLayout";
import displayUserSection from "@/components/tab/displayUserSection";
import ProfileSidebar from "@/components/sidebar/ProfileSidebar";
import useAuth from "@/hooks/useAuth";
import greetUser from "@/lib/greetUser";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateModal } from "@/redux/ui-slice";

export default function UserPage() {
  const router = useRouter();
  const { slug }: any = router.query;
  const slugItem: string = slug ? slug[0] : "";
  const dispatch = useAppDispatch();

  const { authDetails } = useAuth();
  const auth = authDetails();

  // useEffect(() => {
  //   axios
  //     .get("/api/e-wallet")
  //     .then((response) => console.log("response-e-walleet", response.data))
  //     .catch((error) => console.log("error-e-wallet", error));
  // }, []);

  useEffect(() => {
    if (!auth) {
      dispatch(updateModal("auth-modal"));
    }
  }, [auth]);

  return (
    <DefaultLayout title="Your Profile">
      <section className="container flex items-start mx-auto my-10">
        <ProfileSidebar />
        <div className="content w-4/5  p-6 item-start ml-4 rounded  bg-gray-100">
          <h3 className="text-xl font-bold mb-4">
            {greetUser()}, {auth?.displayName}
          </h3>
          {slugItem && displayUserSection(slugItem)}
        </div>
      </section>
    </DefaultLayout>
  );
}
