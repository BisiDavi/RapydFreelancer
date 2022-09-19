import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

import { useAppSelector } from "@/hooks/useRedux";
import useHeader from "@/hooks/useHeader";
import { useAppDispatch } from "@/redux/store";
import { updatePaymentConnect } from "@/redux/user-slice";
import type { NextRouter } from "next/router";

export default function useConnect() {
  const { auth } = useHeader();
  const {
    payment: { connect },
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  function resetConnect() {
    return dispatch(updatePaymentConnect(null));
  }

  function updateConnectAfterPayment() {
    return axios.put("/api/db", {
      data: { $inc: connect },
      collection: "users",
      query: { email: auth?.email },
    });
  }

  function walletConnectPaymentDBUpdate(connects: number, router: NextRouter) {
    return axios
      .put("/api/db", {
        data: { $inc: { connects } },
        collection: "users",
        query: { email: auth?.email },
      })
      .then(() => {
        queryClient.invalidateQueries(["getUserProfile"]);
        router.push("/user/profile");
      });
  }

  return {
    updateConnectAfterPayment,
    connect,
    resetConnect,
    walletConnectPaymentDBUpdate,
  };
}
