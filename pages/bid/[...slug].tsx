/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import ContentEditable from "react-contenteditable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
import useBidJob from "@/hooks/useBidJob";

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
  const [previewMedia, setPreviewMedia] = useState([]);

  const { createBid } = useBidJob();
  function handleChange(e: any) {
    setHtml(e.target.value);
  }

  console.log("html", html);

  const words = html.length > 0 ? html.split(" ") : [];
  const wordCount = words.length > 1 ? "words" : "word";

  function createBidHandler() {
    if (words.length > 50) {
      createBid(html, parsedJob.id);
    } else {
      toast.error(
        "Your Proposal is important and it must be at least 50 words"
      );
    }
  }

  useEffect(() => {
    if (!auth) {
      dispatch(updateModal("auth-modal"));
    }
  }, [auth]);

  const previewClassname =
    previewMedia.length > 1 ? "grid grid-cols-2 gap-4" : "flex";

  return (
    <DefaultLayout className="bg-gray-200 pb-4">
      {job ? (
        <>
          <JobBanner title={parsedJob.title} price={parsedJob.price} />
          <section className="container mx-auto">
            <Breadcrumb title={parsedJob.title} />
            <div className="content bg-white px-6 py-2 pb-6 rounded my-4 mb-8">
              <JobDescription job={parsedJob} />
              <div className="proposal-view my-4 mb-8">
                <ContentEditable
                  className="w-full border p-4 border-blue-500 rounded-xl h-400"
                  html={html}
                  onChange={handleChange}
                />
                <span className="font-bold">
                  {words.length} {wordCount}
                </span>
              </div>
              <Media
                big
                previewMedia={previewMedia}
                setPreviewMedia={setPreviewMedia}
                content={{
                  name: "media",
                  placeholder: "Attach document (optional)",
                  label: "Upload a document (docs/pdf/picture) - (optional)",
                  type: "media",
                  elementType: "media",
                }}
              />
              <div className={`attached-document ${previewClassname}`}>
                {previewMedia.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt="preview attached documents"
                  />
                ))}
              </div>
              <Button
                text="Submit"
                className="bg-green-600 text-white mt-8 w-24 h-10 mx-auto justify-center items-center flex hover:bg-green-400 font-bold"
                onClick={createBidHandler}
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
