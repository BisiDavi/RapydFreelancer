import * as yup from "yup";

export const profileSchema = yup.object({
  address: yup.string().required("Address is required"),
  phonenumber: yup
    .number()
    .typeError("phone number must be a number")
    .positive()
    .required("Phone number is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Enter Zip code"),
  sex: yup.string().required("Your Sex is required"),
  dateOfBirth: yup.string().required("Your date of birth is required"),
  country: yup.string().required("Enter your country"),
});
