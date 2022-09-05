/* eslint-disable no-console */
import axios from "axios";
import { useRef } from "react";

import useToast from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateMedia } from "@/redux/form-slice";

export default function useMediaUpload() {
  const toastID = useRef(null);
  const { updateToast, loadingToast } = useToast();
  const dispatch = useAppDispatch();
  const { media } = useAppSelector((state) => state.form);

  function uploadMedia(mediaArray: any[]) {
    console.log("media", mediaArray);
    console.log("typeof-media", typeof mediaArray);
    loadingToast(toastID);
    [mediaArray].map((mediaItem: Blob | any) => {
      const formData = new FormData();
      formData.append("file", mediaItem);
      formData.append(
        "api_key",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`
      );
      formData.append("upload_preset", "raypd-freelancer");

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        )
        .then((response) => {
          console.log("upload-response", response.data);
          dispatch(updateMedia(response.data.secure_url));
          updateToast(toastID, "success", "document upload, successful");
        })
        .catch((err) => {
          console.log("image-upload-err", err);
          return updateToast(toastID, "error", "upload error");
        });
    });
  }

  return { uploadMedia, media };
}
