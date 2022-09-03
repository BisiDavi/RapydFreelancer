/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import displayFormElement from "@/lib/displayFormElement";
import formContent from "@/json/forms/post-job.json";
import { postJobSchema } from "@/components/form/schema/postJobSchema";
import Button from "@/components/UI/Button";

interface FormInputsProps {
  title: string;
  description: string;
  media: string;
  pricingModel: string;
  duration: string;
  price: number;
}

interface Props {
  type: "price" | "priceVaries";
}

function FormElement({ type }: Props) {
  return (
    <div className="price-view flex items-center">
      {formContent[type].map((formElementContent, index) => {
        const marginStyle =
          Number(formContent.price.length - 1) !== index ? "mr-4" : "";
        return (
          <div key={index} className={`w-1/2 ${marginStyle}`}>
            {displayFormElement(formElementContent)}
          </div>
        );
      })}
    </div>
  );
}

export default function PostJobForm() {
  const methods = useForm<FormInputsProps>({
    resolver: yupResolver(postJobSchema),
    mode: "all",
  });

  const priceModelValue = methods.watch("pricingModel");

  const onSubmit = (data: any) => console.log("data", data);
  return (
    <>
      <FormProvider {...methods}>
        <form
          className="content mb-10 bg-white shadow drop-shadow rounded-xl mt-10 py-1 pb-4 px-8 overflow-y-scroll"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {formContent.main.map((formElementContent, index) => (
            <div key={index}>{displayFormElement(formElementContent)}</div>
          ))}
          {priceModelValue !== "PRICE_VARIES" ? (
            <FormElement type="price" />
          ) : (
            <FormElement type="priceVaries" />
          )}
          <div className="my-4">{displayFormElement(formContent.media)}</div>
          <div className="button-Group flex items-center my-2 mt-4 justify-between w-2/3 justify-center mx-auto">
            <Button
              text="Cancel"
              className="bg-red-600 text-white w-24 h-10 hover:bg-red-400 font-bold"
            />
            <Button
              text="Submit"
              type="submit"
              className="bg-green-600 text-white w-24 h-10 hover:bg-green-400 font-bold"
            />
          </div>
        </form>
      </FormProvider>
      <style jsx>
        {`
          .content {
            height: 60vh;
          }
        `}
      </style>
    </>
  );
}
