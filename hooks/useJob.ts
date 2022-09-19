import { useRouter } from "next/router";
import axios from "axios";

import { updateHire } from "@/redux/payment-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import toSlug from "@/lib/toSlug";

export default function useJob() {
  const { hire }: any = useAppSelector((state) => state.payment);
  const router = useRouter();
  const dispatch = useAppDispatch();

  function resetHired() {
    dispatch(updateHire(null));
  }

  function updateJobAfterHired(data: any) {
    axios.post("/api/jobs/escrow", {
      data,
      query: { email: data.freelancer.email, id: toSlug(data.title) },
    });
  }

  return {
    resetHired,
    router,
    hire,
    updateJobAfterHired,
  };
}

//   data: { $push: { hires: data } },
