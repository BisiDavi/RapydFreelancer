/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import Logo from "@/components/logo";
import PostJobForm from "@/components/form/PostJobForm";
import useAuth from "@/hooks/useAuth";
import { getSkillsDB } from "@/db/skills";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateSkills } from "@/redux/form-slice";
import AuthLayout from "@/layout/AuthLayout";
import connectDB from "@/db/DBConnection";

interface Props {
  skills: { label: string; value: string; id: string }[];
}

export default function PostJob({ skills }: Props) {
  const { authDetails } = useAuth();
  const auth = authDetails();
  const userName = auth ? `Hello 👋  ${auth?.displayName},` : "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateSkills(skills));
  }, []);

  return (
    <AuthLayout>
      <div className="banner w-full py-12">
        <div className="w-5/6 lg:w-1/2 mx-auto lg:h-72">
          <div className="logo-wrapper w-3/4 lg:w-1/3 my-1">
            <Logo />
          </div>
          <h2 className="text-white text-2xl my-4">
            {userName} Get that Project done, Tell us what you need done
          </h2>
          <p className="break-words text-white text-lg my-2">
            Contact RapydFreelancers within minutes. View their profiles,
            ratings, portfolios and chat with them. Pay the freelancers only
            when you are 100% satisfied with their work.
          </p>
          <PostJobForm />
        </div>
      </div>
      <style jsx>
        {`
          .banner {
            background: rgb(2, 0, 36);
            background: linear-gradient(
              90deg,
              rgba(2, 0, 36, 1) 0%,
              rgba(9, 9, 121, 1) 35%,
              rgba(0, 212, 255, 1) 100%
            );
          }
          .content {
            height: 500px;
          }
        `}
      </style>
    </AuthLayout>
  );
}

export async function getServerSideProps() {
  try {
    const dbClient = await connectDB();
    return await getSkillsDB(dbClient).then((response) => {
      const defaultOptions: { label: string; value: string }[] = [];
      response.map((item: { label: string; value: string }) => {
        defaultOptions.push({ label: item.label, value: item.value });
      });
      return {
        props: {
          skills: defaultOptions,
        },
      };
    });
  } catch (err) {
    return {
      props: {
        skills: [],
      },
    };
  }
}
