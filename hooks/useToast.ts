/* eslint-disable no-param-reassign */
import type { MutableRefObject } from "react";
import { toast } from "react-toastify";

export default function useToast() {
  const loadingToast = (toastId: MutableRefObject<any>) => {
    toastId.current = toast("Processing ...", {
      isLoading: true,
      autoClose: false,
    });
  };
  const updateToast = (
    toastId: MutableRefObject<any>,
    toastType?: any,
    message?: string
  ) => {
    const autoCloseStatus = toastType === "success" ? 800 : 1000;
    return toast.update(toastId.current, {
      type: toastType,
      autoClose: autoCloseStatus,
      render: message,
      isLoading: false,
    });
  };

  return {
    loadingToast,
    updateToast,
  };
}
