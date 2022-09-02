import React, { Dispatch, SetStateAction } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface Props {
  passwordVisiblity: boolean;
  setPasswordVisibility: Dispatch<SetStateAction<boolean>>;
}

export default function ToggleEye({
  passwordVisiblity,
  setPasswordVisibility,
}: Props) {
  function togglePasswordVisibilityHandler() {
    setPasswordVisibility(!passwordVisiblity);
  }
  return (
    <button
      type="button"
      className="absolute right-3 bottom-3 "
      onClick={togglePasswordVisibilityHandler}
    >
      {passwordVisiblity ? <AiFillEyeInvisible /> : <AiFillEye />}
    </button>
  );
}
