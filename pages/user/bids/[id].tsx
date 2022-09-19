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
  bids: string;
}

export default function ViewBidPage({ bids }: PropType) {
  const mobileView = useMediaQuery("(max-width:768px)");
  const { auth } = useHeader();
  const parsedBids = JSON.parse(bids);
  console.log("bid", parsedBids);

  return (
    <DefaultLayout title="View Bids">
      <section className="container flex items-start mx-auto my-10">
        {!mobileView && <ProfileSidebar />}
        <div className="content w-full lg:w-4/5 p-6 item-start ml-4 rounded  bg-gray-100">
          <h3 className="text-xl font-bold mb-4">
            {greetUser()}, {auth?.displayName}
          </h3>
          <BidItemView bids={parsedBids} />
        </div>
      </section>
    </DefaultLayout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext | any
) => {
  const { id } = context.query;
  console.log("context.query", context.query);

  try {
    const dbClient = await connectDB();
    const job = await getDataDB(dbClient, "jobs", { id });
    const jobBids = job[0].bids;

    console.log("jobBids", jobBids);

    return {
      props: {
        bids: JSON.stringify(jobBids),
      },
    };
  } catch (err) {
    console.log("error", err);
    return {
      props: {
        bids: [],
      },
    };
  }
};
