/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useRouter } from "next/router";

import DefaultLayout from "@/layout/DefaultLayout";
import displayUserSection from "@/components/tab/displayUserSection";
import ProfileSidebar from "@/components/sidebar/ProfileSidebar";
import greetUser from "@/lib/greetUser";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateModal } from "@/redux/ui-slice";
import useMediaQuery from "@/hooks/useMediaQuery";
import useHeader from "@/hooks/useHeader";

export default function UserPage() {
  const router = useRouter();
  const { slug }: any = router.query;
  const slugItem: string = slug ? slug[0] : "";
  const mobileView = useMediaQuery("(max-width:768px)");
  const dispatch = useAppDispatch();
  const { auth } = useHeader();

  useEffect(() => {
    if (!auth) {
      dispatch(updateModal("auth-modal"));
    }
  }, [auth]);

  return (
    <DefaultLayout title="Your Profile">
      <section className="container flex items-start mx-auto my-10">
        {!mobileView && <ProfileSidebar />}
        <div className="content w-full lg:w-4/5 p-6 item-start ml-4 rounded  bg-gray-100">
          <h3 className="text-xl font-bold mb-4">
            {greetUser()}, {auth?.displayName}
          </h3>
          {slugItem && displayUserSection(slugItem)}
        </div>
      </section>
    </DefaultLayout>
  );
}
