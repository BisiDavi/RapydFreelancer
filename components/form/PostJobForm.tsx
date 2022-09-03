import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import displayFormElement from "@/lib/displayFormElement";
import formContent from "@/json/forms/post-job.json";
import { postJobSchema } from "./schema/postJobSchema";

interface FormInputsProps {
  title: string;
  description: string;
  media: string;
}

export default function PostJobForm() {
  const methods = useForm<FormInputsProps>({
    resolver: yupResolver(postJobSchema),
    mode: "all",
  });

  const onSubmit = (data: any) => console.log("data", data);
  return (
    <FormProvider {...methods}>
      <div className="content mb-10 bg-white shadow drop-shadow rounded-xl mt-10">
        <form className="py-1 pb-4 px-8">
          {formContent.map((formElementContent, index) => (
            <div key={index}>{displayFormElement(formElementContent)}</div>
          ))}
        </form>
      </div>
    </FormProvider>
  );
}
