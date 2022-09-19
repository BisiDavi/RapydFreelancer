import type { GetServerSidePropsContext } from "next";

import ProfileSidebar from "@/components/sidebar/ProfileSidebar";
import DefaultLayout from "@/layout/DefaultLayout";
import useMediaQuery from "@/hooks/useMediaQuery";
import BidItemView from "@/views/BidItemView";
import connectDB from "@/db/DBConnection";
import { getDataDB } from "@/db";
import ProposalListingSidebar from "@/components/sidebar/ProposalListingSidebar";
import { useAppSelector } from "@/hooks/useRedux";

interface PropType {
  bids: string;
}

export default function ViewBidPage({ bids }: PropType) {
  const mobileView = useMediaQuery("(max-width:768px)");
  const parsedBids = JSON.parse(bids);
  const { proposalSidebar } = useAppSelector((state) => state.UI);

  console.log("bid", parsedBids);

  return (
    <DefaultLayout title="View Bids">
      {proposalSidebar && proposalSidebar?.active && <ProposalListingSidebar />}
      <section className="container flex items-start mx-auto my-10">
        {!mobileView && <ProfileSidebar />}
        <div className="content w-full lg:w-4/5 item-start ml-4 rounded  bg-gray-100">
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
