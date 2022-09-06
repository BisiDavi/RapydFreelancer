/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import Logo from "@/components/logo";
import PostJobForm from "@/components/form/PostJobForm";
import useAuth from "@/hooks/useAuth";
import { DBClient } from "@/db/DBConnection";
import { getSkillsDB } from "@/db/skills";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateSkills } from "@/redux/form-slice";
import AuthModal from "@/components/modal/AuthModal";
import useAuthModal from "@/hooks/useAuthModal";

interface Props {
  skills: { label: string; value: string; id: string }[];
}

export default function PostJob({ skills }: Props) {
  const { authDetails } = useAuth();
  const auth = authDetails();
  const { modal, toggleModal } = useAuthModal();
  const userName = auth ? `Hello 👋  ${auth?.displayName},` : "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateSkills(skills));
  }, []);

  return (
    <>
      <AuthModal modal={modal} toggleModal={toggleModal} />
      <div className="banner w-full py-12">
        <div className=" w-1/2 mx-auto h-72">
          <div className="logo-wrapper w-1/3 my-1">
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
    </>
  );
}

export async function getServerSideProps() {
  try {
    const dbClient = await DBClient();
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
