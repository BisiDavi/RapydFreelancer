import type { GetServerSidePropsContext } from "next";

import ProfileSidebar from "@/components/sidebar/ProfileSidebar";
import DefaultLayout from "@/layout/DefaultLayout";
import useMediaQuery from "@/hooks/useMediaQuery";
import useHeader from "@/hooks/useHeader";
import greetUser from "@/lib/greetUser";
import BidItemView from "@/views/BidItemView";
import connectDB from "@/db/DBConnection";
import { getDataDB } from "@/db";

interface PropType {
  bid: string;
}

export default function ViewBidPage({ bid }: PropType) {
  const mobileView = useMediaQuery("(max-width:768px)");
  const { auth } = useHeader();
  const parsedBid = JSON.parse(bid);
  console.log("bid", parsedBid);

  return (
    <DefaultLayout title="View Bids">
      <section className="container flex items-start mx-auto my-10">
        {!mobileView && <ProfileSidebar />}
        <div className="content w-full lg:w-4/5 p-6 item-start ml-4 rounded  bg-gray-100">
          <h3 className="text-xl font-bold mb-4">
            {greetUser()}, {auth?.displayName}
          </h3>
          <BidItemView bid={parsedBid} />
        </div>
      </section>
    </DefaultLayout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext | any
) => {
  const { id, userId } = context.query;
  console.log("context.query", context.query);

  try {
    const dbClient = await connectDB();
    const user = await getDataDB(dbClient, "users", { email: userId });
    console.log("user", user);
    const bids = user[0].bids;
    const getABid = bids.filter((item: { id: string }) => item.id === id)[0];
    console.log("getABid", getABid);

    return {
      props: {
        bid: JSON.stringify(getABid),
      },
    };
  } catch (err) {
    console.log("error", err);
    return {
      props: {
        bid: null,
      },
    };
  }
};
