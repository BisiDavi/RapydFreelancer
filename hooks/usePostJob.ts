import axios from "axios";

import { useAppSelector } from "@/hooks/useRedux";
import useAuth from "@/hooks/useAuth";
import useRequestMutation from "@/hooks/useRequestMutation";

export default function usePostJob() {
  const { selectedSkills, jobId, media } = useAppSelector(
    (state) => state.form
  );
  const { authDetails } = useAuth();
  const auth: any = authDetails();

  function createJob(jobData: any) {
    const job = {
      ...jobData,
      ...media,
      skills: selectedSkills,
      id: jobId,
      user: {
        email: auth?.providerData[0].email,
        displayName: auth?.providerData[0].displayName,
      },
    };
    return axios.post("/api/jobs", job);
  }

  function useCreateJobMutation() {
    return useRequestMutation((job) => createJob(job), {
      mutationKey: ["useCreateJobMutation"],
      success: "Job added",
      error: "unable to post job",
    });
  }

  return {
    useCreateJobMutation,
  };
}
