/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { BiUpload } from "react-icons/bi";
import Button from "@/components/UI/Button";
import useMediaUpload from "@/hooks/useMediaUpload";

// upload to cloudinary
// save the data in database.

export default function SettingsView() {
  const formData = new FormData();
  const [image, setImage] = useState<null | string>(null);
  const { uploadImage } = useMediaUpload();

  function uploadImageHandler(e: any) {
    const imageData = URL.createObjectURL(e.target.files[0]);
    console.log("e.target.files[0]", e.target.files[0]);
    uploadImage(e.target.files[0]);
    setImage(imageData);
  }

  console.log("image,", image);

  return (
    <div>
      <p>Upload Your Profile Image</p>
      <p>This will boost your chance of get jobs</p>
      <p>click on the circle below to upload your profile picture</p>
      <div className="image rounded-full bg-gray-500 h-52 flex items-center justify-center relative my-4 w-52">
        {image && (
          <img
            src={image}
            alt="preview"
            className="absolute z-40 rounded-full"
          />
        )}
        <label
          htmlFor="uploadImage"
          className="wrapper z-50 flex items-center  w-32 flex-col font-bold cursor-pointer border py-1 hover:bg-gray-900 hover:text-white border-gray-100 text-white px-2 rounded-md"
        >
          <BiUpload className="mr-1" size={40} />
          <input
            type="file"
            id="uploadImage"
            height="130px"
            width="160px"
            className="font-medium text-white items-center px-3 rounded-md hover:bg-gray-900 hover:border-gray-900  flex"
            onChange={uploadImageHandler}
          />
          <span className="text-xs text-center">Upload Picture</span>
        </label>
      </div>
      <Button
        text="Upload"
        className="bg-blue-500 py-2 px-4 text-white rounded w-52"
      />
      <style jsx>
        {`
          input[type="file"] {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
