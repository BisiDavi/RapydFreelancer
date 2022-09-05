import axios from "axios";

import { useAppSelector } from "@/hooks/useRedux";
import useAuth from "@/hooks/useAuth";
import useRequestMutation from "@/hooks/useRequestMutation";

export default function usePostJob() {
  const { selectedSkills, jobId } = useAppSelector((state) => state.form);
  const { authDetails } = useAuth();
  const auth: any = authDetails();

  function createJob(jobData: any) {
    const job = {
      ...jobData,
      skills: selectedSkills,
      id: jobId,
      user: {
        email: auth.providerData[0].email,
        displayName: auth.providerData[0].displayName,
      },
    };
    return axios.post("/api/jobs", job);
  }

  function useCreateSkillMutation() {
    return useRequestMutation((job) => createJob(job), {
      mutationKey: ["useCreateSkillMutation"],
      success: "skill added",
      error: "unable to add skill",
    });
  }

  return {
    useCreateSkillMutation,
  };
}
