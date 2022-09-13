/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import DefaultLayout from "@/layout/DefaultLayout";
import { DBClient } from "@/db/DBConnection";
import { getDataDB } from "@/db";
import Breadcrumb from "@/components/BreadCrumb";
import JobBanner from "@/components/banners/JobBanner";
import JobDescription from "@/views/JobDescription";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/redux/store";
import { updateModal } from "@/redux/ui-slice";
import ErrorView from "@/views/ErrorView";

import type { GetServerSidePropsContext } from "next";
import type { jobType } from "@/types";
import BidForm from "@/components/form/form-elements/BidForm";

interface Props {
  job: string;
}

export default function BiddingPage({ job }: Props) {
  const parsedJob: jobType = job ? JSON.parse(job) : null;
  const { authDetails } = useAuth();
  const auth = authDetails();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth) {
      dispatch(updateModal("auth-modal"));
    }
  }, [auth]);

  return (
    <DefaultLayout className="bg-gray-200 pb-4">
      {job ? (
        <>
          <JobBanner title={parsedJob.title} price={parsedJob.price} />
          <section className="container mx-auto">
            <Breadcrumb title={parsedJob.title} />
            <div className="content bg-white px-6 py-2 pb-6 rounded my-4 mb-8">
              <JobDescription job={parsedJob} />
              <BidForm job={parsedJob} />
            </div>
          </section>
        </>
      ) : (
        <ErrorView />
      )}
    </DefaultLayout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext | any
) => {
  const id = context.query.slug[1];

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
