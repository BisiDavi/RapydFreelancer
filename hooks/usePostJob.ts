import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useAuth from "@/hooks/useAuth";
import useRequestMutation from "@/hooks/useRequestMutation";
import {
  resetMedia,
  updateFormData,
  updateSelectedSkills,
} from "@/redux/form-slice";
import { updateModal } from "@/redux/ui-slice";
import toSlug from "@/lib/toSlug";
import { jobType } from "@/types";

export default function usePostJob() {
  const { selectedSkills, jobId, media } = useAppSelector(
    (state) => state.form
  );
  const dispatch = useAppDispatch();
  const { authDetails } = useAuth();
  const auth: any = authDetails();

  function createJob(jobData: any) {
    const job: jobType = {
      ...jobData,
      media,
      skills: selectedSkills,
      id: toSlug(jobData.title),
      active: true,
      projectId: uuidv4(),
      paid: false,
      bids: [],
      user: {
        email: auth?.providerData[0].email,
        displayName: auth?.providerData[0].displayName,
      },
    };
    return axios.post("/api/jobs", { job });
  }

  function useCreateJobMutation() {
    return useRequestMutation((job) => createJob(job), {
      mutationKey: ["useCreateJobMutation"],
      success: "Job added",
      error: "unable to post job",
      onSuccessMethod: () => {
        dispatch(resetMedia());
        dispatch(updateSelectedSkills([]));
        dispatch(updateModal(null));
        dispatch(updateFormData(null));
      },
    });
  }

  return {
    useCreateJobMutation,
  };
}
