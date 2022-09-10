import * as yup from "yup";

export const profileSchema = yup.object({
  address: yup.string().required("Address is required"),
  phonenumber: yup.string().required("Phone number is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Enter Zip code"),
  country: yup.string().required("Enter your country"),
});
