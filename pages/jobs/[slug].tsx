import dynamic from "next/dynamic";

import { getDataDB } from "@/db";
import { DBClient } from "@/db/DBConnection";
import JobBanner from "@/components/banners/JobBanner";
import { useAppSelector } from "@/hooks/useRedux";
import DefaultLayout from "@/layout/DefaultLayout";
import { GetServerSidePropsContext } from "next";

const DynamicFooterAlert = dynamic(
  () =>
    import(
      /* webpackChunkName: 'FooterAlert' */ "@/components/alerts/FooterAlert"
    )
);

interface Props {
  job: string;
}

export default function JobsListingPage({ job }: Props) {
  console.log("job", job);
  const { showFooterAlert } = useAppSelector((state) => state.layout);
  return (
    <DefaultLayout title="Apply for Jobs, get it Done and get Paid.">
      <JobBanner />
      <h4 className="text-center text-xl">Job Listing Page</h4>
      {showFooterAlert && <DynamicFooterAlert />}
    </DefaultLayout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const title = context.query.title;

  try {
    const dbClient = await DBClient();
    const job = await getDataDB(dbClient, "jobs", { title });

    return {
      props: {
        job: JSON.stringify(job[0]),
      },
    };
  } catch (err) {
    console.log("error", err);
    return {
      props: {
        job: null,
      },
    };
  }
};
