import ContentEditable from "react-contenteditable";
import { useState } from "react";

import DefaultLayout from "@/layout/DefaultLayout";
import { DBClient } from "@/db/DBConnection";
import { getDataDB } from "@/db";
import Breadcrumb from "@/components/BreadCrumb";
import JobBanner from "@/components/banners/JobBanner";
import Button from "@/components/UI/Button";
import type { GetServerSidePropsContext } from "next";
import type { jobType } from "@/types";
import Media from "@/components/form/form-elements/Media";

interface Props {
  job: string;
}

export default function BiddingPage({ job }: Props) {
  const parsedJob: jobType = JSON.parse(job);
  const [html, setHtml] = useState(
    "Get started with your <b>Proposal</b> here !"
  );

  function handleChange(e: any) {
    setHtml(e.target.value);
  }

  return (
    <DefaultLayout className="bg-gray-200">
      <JobBanner title={parsedJob.title} price={parsedJob.price} />
      <section className="container mx-auto">
        <Breadcrumb title={parsedJob.title} skill={parsedJob.skills[0].label} />
        <p className="text-lg my-4">{parsedJob.description}</p>

        <ul className="flex items-center my-4">
          <span className="font-bold">Skills:</span>
          {parsedJob.skills.map((skill) => (
            <li
              key={skill.value}
              className="mx-2 border border-blue-500 px-2 rounded-md hover:text-white hover:bg-blue-500"
            >
              {skill.label}
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <h3 className="text-xl font-bold">Write your Proposal for this Job</h3>
        <ContentEditable
          className="w-full my-4 mb-8 border border-gray-800 h-600"
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
        />
        <Button
          text="Submit"
          className="bg-green-600 text-white mt-8 w-24 h-10 mx-auto justify-center items-center flex hover:bg-green-400 font-bold"
        />
      </section>
    </DefaultLayout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext | any
) => {
  console.log("context.query.slug", context.query.slug);
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
