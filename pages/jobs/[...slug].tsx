import dynamic from "next/dynamic";

import { getDataDB } from "@/db";
import { DBClient } from "@/db/DBConnection";
import JobBanner from "@/components/banners/JobBanner";
import { useAppSelector } from "@/hooks/useRedux";
import DefaultLayout from "@/layout/DefaultLayout";
import { GetServerSidePropsContext } from "next";
import Breadcrumb from "@/components/BreadCrumb";
import { jobType } from "@/types";
import Button from "@/components/UI/Button";

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
  const parsedJob: jobType = JSON.parse(job);
  console.log("parsedJob", parsedJob);

  const { showFooterAlert } = useAppSelector((state) => state.layout);
  return (
    <DefaultLayout title={parsedJob.title} className="bg-gray-200">
      <JobBanner title={parsedJob.title} price={parsedJob.price} />
      <section className="container mx-auto mt-4 h-screen">
        <Breadcrumb title={parsedJob.title} skill={parsedJob.skills[0].label} />
        <div className="content w-full mt-4">
          <div className="details w-3/4 shadow p-4 bg-white">
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
            <div className="view">
              <div className="group flex items-center justify-between">
                <h3 className="text-xl">
                  Are you interested in this Job? Offer to work on this job now!
                </h3>
                <Button
                  text="Bid on this Job"
                  className="bg-red-500 font-bold text-xl text-white py-2 px-6 my-4 hover:opacity-80"
                />
              </div>
              <p className="text-xl underline">Tips to win job:</p>
              <ul>
                <li>✔ Outline your proposal on this project.</li>
                <li>
                  ✔ Base your proposal on the client project and proffer
                  possible solution.
                </li>
                <li>
                  ✔ Give detailed milestone on how you want to accomplish the
                  project.
                </li>
                <li>✔ You can attach documents to buttress your proposal.</li>
                <li>✔ You can always negotiate the Budget up or down.</li>
              </ul>
            </div>
          </div>
          <aside className="w-1/4"></aside>
        </div>
      </section>

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
