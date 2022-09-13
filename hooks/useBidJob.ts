import axios from "axios";
import { useRef } from "react";

import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useToast from "@/hooks/useToast";
import { resetBidMedia } from "@/redux/form-slice";

export default function useBidJob() {
  const { bidMedia } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const { authDetails } = useAuth();
  const auth: any = authDetails();
  const { loadingToast, updateToast } = useToast();
  const toastID = useRef(null);
  const date = new Date();

  const proposalMedia = bidMedia.length ? { media: bidMedia } : "";

  function createBid(proposal: string, jobId: string) {
    const data = {
      ...proposalMedia,
      proposal,
      user: {
        email: auth?.providerData[0].email,
        displayName: auth?.providerData[0].displayName,
      },
      createdAt: date,
    };
    loadingToast(toastID);
    axios
      .post(`/api/bid/${jobId}`, { data })
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
