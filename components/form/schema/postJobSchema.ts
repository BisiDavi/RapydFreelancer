import * as yup from "yup";

export  const postJobSchema = yup.object({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Enter a job description"),
});
