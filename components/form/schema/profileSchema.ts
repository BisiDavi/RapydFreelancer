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

const requiredField = (requiredText: string) => ({
  is: false,
  then: yup.string().required(requiredText),
});

export const buyconnectSchema = yup.object({
  paymentType: yup.string(),
  currency: yup.string().when("paymentType", {
    is: "MAKE_PAYMENT",
    then: yup.string().required("Currency is required"),
  }),
  country: yup.string().when("paymentType", {
    is: "MAKE_PAYMENT",
    then: yup.string().required("Country is required"),
  }),
  connectPrice: yup.string().required("Connect quantity is required"),
});
