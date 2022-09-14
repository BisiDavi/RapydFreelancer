import axios from "axios";
import { useRef } from "react";

import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useToast from "@/hooks/useToast";
import { resetBidMedia } from "@/redux/form-slice";
import type { jobType } from "@/types";

export default function useBidJob() {
  const { bidMedia } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const { authDetails } = useAuth();
  const auth: any = authDetails();
  const { loadingToast, updateToast } = useToast();
  const toastID = useRef(null);
  const date = new Date();

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
    loadingToast(toastID);
    axios
      .post(`/api/bid/${job.id}`, { data })
      .then((response) => {
        console.log("response-create-bid", response.data);
        updateToast(
          toastID,
          "success",
          "Congrats, you've successfully bidded for the job"
        );
        dispatch(resetBidMedia());
      })
      .catch((error) => {
        console.log("error", error);
        updateToast(
          toastID,
          "error",
          "Oops, unable to place your bid, please try again"
        );
      });
  }

  return { createBid };
}
