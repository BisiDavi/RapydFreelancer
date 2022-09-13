/* eslint-disable react-hooks/exhaustive-deps */
import ContentEditable from "react-contenteditable";
import { useEffect, useState } from "react";

import DefaultLayout from "@/layout/DefaultLayout";
import { DBClient } from "@/db/DBConnection";
import { getDataDB } from "@/db";
import Breadcrumb from "@/components/BreadCrumb";
import JobBanner from "@/components/banners/JobBanner";
import Button from "@/components/UI/Button";
import Media from "@/components/form/form-elements/Media";
import JobDescription from "@/views/JobDescription";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/redux/store";
import { updateModal } from "@/redux/ui-slice";
import ErrorView from "@/views/ErrorView";

import type { GetServerSidePropsContext } from "next";
import type { jobType } from "@/types";

interface Props {
  job: string;
}

export default function BiddingPage({ job }: Props) {
  const parsedJob: jobType = job ? JSON.parse(job) : null;
  const { authDetails } = useAuth();
  const auth = authDetails();
  const dispatch = useAppDispatch();
  const [html, setHtml] = useState(
    "Get started with your <b>Proposal</b> here !"
  );
  function handleChange(e: any) {
    setHtml(e.target.value);
  }

  console.log("html", html);

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
              <ContentEditable
                className="w-full my-4 mb-8 border p-4 border-blue-500 rounded-xl h-400"
                html={html}
                onChange={handleChange}
              />
              <Media
                content={{
                  name: "media",
                  placeholder: "Attach document (optional)",
                  label: "Upload a document (docs/pdf/picture) - (optional)",
                  type: "media",
                  elementType: "media",
                }}
                big
              />
              <Button
                text="Submit"
                className="bg-green-600 text-white mt-8 w-24 h-10 mx-auto justify-center items-center flex hover:bg-green-400 font-bold"
              />
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
