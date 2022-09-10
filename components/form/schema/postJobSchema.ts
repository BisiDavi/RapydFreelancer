import * as yup from "yup";

export const postJobSchema = yup.object({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Enter a job description"),
  price: yup
    .number()
    .typeError("price must be a number")
    .positive()
    .required("Project Price is required"),
  duration: yup.string().required("Project duration is required"),
  durationPeriod: yup
    .number()
    .typeError("Project duration period must be a number")
    .required("Project duration period is required"),
});
