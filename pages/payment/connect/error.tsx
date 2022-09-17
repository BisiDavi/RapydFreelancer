/* eslint-disable @next/next/no-img-element */
import DefaultLayout from "@/layout/DefaultLayout";
import ProfileSidebar from "@/components/sidebar/ProfileSidebar";

export default function ConnectPaymentError() {
  return (
    <DefaultLayout title="Your Profile">
      <section className="container flex items-start mx-auto my-10">
        <ProfileSidebar />
        <div className="content w-4/5 mx-auto flex flex-col justify-center p-6 item-start ml-4 rounded  bg-gray-100">
          <img
            src="/error-icon.webp"
            alt="successful"
            className="w-1/6 mx-auto rounded-full h-40 w-40"
          />
          <h4 className="font-bold text-center my-4">
            Error purchasing Connect
          </h4>
        </div>
      </section>
    </DefaultLayout>
  );
}
