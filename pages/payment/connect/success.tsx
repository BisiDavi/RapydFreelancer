/* eslint-disable @next/next/no-img-element */
import DefaultLayout from "@/layout/DefaultLayout";
import ProfileSidebar from "@/components/sidebar/ProfileSidebar";

export default function ConnectPaymentSuccessful() {
  return (
    <DefaultLayout title="Your Profile">
      <section className="container flex items-start mx-auto my-10">
        <ProfileSidebar />
        <div className="content w-4/5 mx-auto flex flex-col  justify-center  p-6 item-start ml-4 rounded  bg-gray-100">
          <img
            src="/checkmark.gif"
            alt="successful"
            className="w-1/6 mx-auto rounded-full"
          />
          <h4 className="font-bold text-center my-4">
            Connect Purchase Successful, Congrats
          </h4>
        </div>
      </section>
    </DefaultLayout>
  );
}