import * as yup from "yup";

export const profileSchema = yup.object({
  address: yup.string().required("Address is required"),
  phonenumber: yup.string().required("Phone number is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Enter Zip code"),
  sex: yup.string().required("Your Sex is required"),
  dateOfBirth: yup.string().required("Your date of birth is required"),
  country: yup.string().required("Enter your country"),
});

export const virtualAccountSchema = yup.object({
  currency: yup.string().required("Currency is required"),
  amount: yup.string().required("Amount to deposit to ewallet is required"),
  country: yup.string().required("Country is required"),
});

export const buyconnectSchema = yup.object({
  currency: yup.string().required("Currency is required"),
  connectPrice: yup.string().required("Connect quantity is required"),
  country: yup.string().required("Country is required"),
});
