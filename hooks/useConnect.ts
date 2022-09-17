import axios from "axios";

import { useAppSelector } from "@/hooks/useRedux";
import useHeader from "@/hooks/useHeader";
import { useAppDispatch } from "@/redux/store";
import { updatePaymentConnect } from "@/redux/user-slice";

export default function useConnect() {
  const { auth } = useHeader();
  const {
    payment: { connect },
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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

  return {
    updateConnectAfterPayment,
    connect,
    resetConnect,
  };
}
