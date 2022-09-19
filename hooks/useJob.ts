import { useRouter } from "next/router";
import axios from "axios";

import { updateHire } from "@/redux/payment-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

export default function useJob() {
  const { hire } = useAppSelector((state) => state.payment);
  const router = useRouter();
  const dispatch = useAppDispatch();

  function resetHired() {
    dispatch(updateHire(null));
  }

  function updateJobAfterHired(freelancerEmail: string, data: any) {
    axios.put("/api/db", {
      data: { $push: { hires: data } },
      query: { email: freelancerEmail },
      collection: "users",
    });
    axios.put("/api/db", {
      data: { $push: { hires: data } },
      query: { email: freelancerEmail },
      collection: "job",
    });
  }

  return {
    resetHired,
    router,
    hire,
    updateJobAfterHired,
  };
}
