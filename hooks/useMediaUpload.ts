/* eslint-disable no-console */
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import useToast from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateBidMedia, updateMedia } from "@/redux/form-slice";
import { updateUserProfile } from "@/redux/user-slice";

export default function useMediaUpload() {
  const toastID = useRef(null);
  const { updateToast, loadingToast } = useToast();
  const dispatch = useAppDispatch();
  const { media } = useAppSelector((state) => state.form);
  const router = useRouter();
  const queryClient = useQueryClient();

  function uploadImage(image: any) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("api_key", `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`);
    formData.append("upload_preset", "raypd-freelancer");

    return axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
  }

  function uploadMedia(mediaArray: any[]) {
    loadingToast(toastID);
    [mediaArray].map((mediaItem: Blob | any) => {
      return uploadImage(mediaItem)
        .then((response) => {
          dispatch(updateUserProfile(null));
          queryClient.invalidateQueries(["getUserProfile"]);
          console.log("upload-response", response.data);
          if (router.asPath.includes("post-job")) {
            dispatch(updateMedia(response.data.secure_url));
          } else if (router.asPath.includes("/bid")) {
            dispatch(updateBidMedia(response.data.secure_url));
          }
          updateToast(toastID, "success", "document upload, successful");
        })
        .catch((err) => {
          console.log("image-upload-err", err);
          return updateToast(toastID, "error", "upload error");
        });
    });
  }

  return { uploadMedia, uploadImage, media };
}
