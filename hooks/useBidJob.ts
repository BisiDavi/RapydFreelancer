import axios from "axios";

import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

export default function useBidJob() {
  const { bidMedia } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();
  const { authDetails } = useAuth();
  const auth: any = authDetails();
  const date = new Date();

  const proposalMedia = bidMedia.length ? { media: bidMedia } : "";

  function createBid(proposal: string) {
    const bidData = {
      ...proposalMedia,
      proposal,
      user: {
        email: auth?.providerData[0].email,
        displayName: auth?.providerData[0].displayName,
      },
      createdAt: date,
    };
  }

  return {};
}
