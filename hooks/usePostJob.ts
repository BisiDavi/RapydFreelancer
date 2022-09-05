import axios from "axios";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useAuth from "@/hooks/useAuth";
import useRequestMutation from "@/hooks/useRequestMutation";
import { updateMedia, updateSelectedSkills } from "@/redux/form-slice";

export default function usePostJob() {
  const { selectedSkills, jobId, media } = useAppSelector(
    (state) => state.form
  );
  const dispatch = useAppDispatch();
  const { authDetails } = useAuth();
  const auth: any = authDetails();

  function createJob(jobData: any) {
    console.log("jobData", jobData);
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
    console.log("job", job);
    return axios.post("/api/jobs", job);
  }

  function useCreateJobMutation() {
    return useRequestMutation(
      (job) => {
        console.log("job-useRequestMutation", job);
        return createJob(job);
      },
      {
        mutationKey: ["useCreateJobMutation"],
        success: "Job added",
        error: "unable to post job",
        onSuccessMethod: () => {
          dispatch(updateMedia([]));
          dispatch(updateSelectedSkills([]));
        },
      }
    );
  }

  return {
    useCreateJobMutation,
  };
}
