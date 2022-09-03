import * as yup from "yup";

export const postJobSchema = yup.object({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Enter a job description"),
  pricingModel: yup.string().required("Select your project pricing model"),
  price: yup.number().positive().required("Project Price is required"),
  duration: yup.string().required("Project duration is required"),
});
