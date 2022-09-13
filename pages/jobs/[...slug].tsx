import dynamic from "next/dynamic";

import { getDataDB } from "@/db";
import { DBClient } from "@/db/DBConnection";
import JobBanner from "@/components/banners/JobBanner";
import { useAppSelector } from "@/hooks/useRedux";
import DefaultLayout from "@/layout/DefaultLayout";
import Breadcrumb from "@/components/BreadCrumb";
import JobListingView from "@/views/JobListingView";
import type { GetServerSidePropsContext } from "next";
import type { jobType } from "@/types";
import ErrorView from "@/views/ErrorView";

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
  const parsedJob: jobType = job ? JSON.parse(job) : null;

  const { showFooterAlert } = useAppSelector((state) => state.layout);
  return (
    <DefaultLayout title={parsedJob.title} className="bg-gray-200 pb-4">
      {job ? (
        <>
          <JobBanner title={parsedJob.title} price={parsedJob.price} />
          <section className="container mx-auto my-6">
            <Breadcrumb title={parsedJob.title} />
            <JobListingView job={parsedJob} />
          </section>
        </>
      ) : (
        <ErrorView error="Unable to fetch jobs at the moment, please check your internet connection and refresh the page" />
      )}
      {showFooterAlert && <DynamicFooterAlert />}
    </DefaultLayout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext | any
) => {
  const id = context.query.slug[2];

  try {
    const dbClient = await DBClient();
    const job = await getDataDB(dbClient, "jobs", { id });

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
