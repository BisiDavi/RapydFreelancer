import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

import useRequestMutation from "@/hooks/useRequestMutation";
import useAuth from "@/hooks/useAuth";
import { useAppSelector } from "@/hooks/useRedux";
import { useAppDispatch } from "@/redux/store";
import { resetBidMedia } from "@/redux/form-slice";
import type { jobType } from "@/types";

export default function useBidMutation() {
  const { authDetails } = useAuth();
  const auth: any = authDetails();
  const { bidMedia } = useAppSelector((state) => state.form);
  const date = new Date();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  function createBid(proposal: string, job: jobType) {
    const data = {
      proposal,
      title: job.title,
      price: job.price,
      media: bidMedia,
      recruiter: job.user,
      freelancer: {
        email: auth?.providerData[0].email,
        displayName: auth?.providerData[0].displayName,
      },
      createdAt: date,
    };
    console.log("data", data);
    return axios.post(`/api/bid/${job.id}`, { data });
  }
  return useRequestMutation(({ proposal, job }) => createBid(proposal, job), {
    mutationKey: ["useBidMutation"],
    success: "Congrats, you've successfully bidded for the job",
    error: "Oops, unable to place your bid, please try again",
    onSuccessMethod: () => {
      dispatch(resetBidMedia());
      queryClient.invalidateQueries(["getBidsFromPostedJobs"]);
    },
  });
}
