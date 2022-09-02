import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Enter a vaild email address")
    .required("E-mail address is required"),
  password: yup.string().required("Password is required"),
});

export const signupSchema = yup.object({
  name: yup
    .string()
    .min(6, "minium of six letters")
    .required("your full name is required"),
  email: yup
    .string()
    .email("Enter a vaild email address")
    .required("E-mail address is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
