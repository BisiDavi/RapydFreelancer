import ProfileSidebar from "@/components/sidebar/ProfileSidebar";
import DefaultLayout from "@/layout/DefaultLayout";
import useMediaQuery from "@/hooks/useMediaQuery";
import useHeader from "@/hooks/useHeader";
import greetUser from "@/lib/greetUser";
import BidItemView from "@/views/BidItemView";

export default function ViewBidPage() {
  const mobileView = useMediaQuery("(max-width:768px)");
  const { auth } = useHeader();

  return (
    <DefaultLayout title="View Bids">
      <section className="container flex items-start mx-auto my-10">
        {!mobileView && <ProfileSidebar />}
        <div className="content w-full lg:w-4/5 p-6 item-start ml-4 rounded  bg-gray-100">
          <h3 className="text-xl font-bold mb-4">
            {greetUser()}, {auth?.displayName}
          </h3>
          <BidItemView />
        </div>
      </section>
    </DefaultLayout>
  );
}
