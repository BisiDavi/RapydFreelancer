/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";

import displayFormElement from "@/lib/displayFormElement";
import formContent from "@/json/forms/post-job.json";
import { postJobSchema } from "@/components/form/schema/postJobSchema";
import Button from "@/components/UI/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import PostJobFormElement from "@/components/form/form-elements/PostJobFormElement";
import { updateFormData, updateJobId } from "@/redux/form-slice";
import { updateModal } from "@/redux/ui-slice";
import useUI from "@/hooks/useUI";

const DynamicPostJobModal = dynamic(
  () =>
    import(
      /* webpackChunkName:'PostJobModal' */ "@/components/modal/PostJobModal"
    )
);

interface FormInputsProps {
  title: string;
  description: string;
  media: string;
  pricingModel: string;
  duration: string;
  price: number;
}

export default function PostJobForm() {
  const dispatch = useAppDispatch();
  const methods = useForm<FormInputsProps>({
    resolver: yupResolver(postJobSchema),
    mode: "all",
  });
  const { modal, toggleModal } = useUI();
  const { selectedSkills } = useAppSelector((state) => state.form);

  const onSubmit = (data: any) => {
    dispatch(updateJobId());
    dispatch(updateFormData(data));
    dispatch(updateModal("confirm-job-modal"));
  };
  return (
    <>
      {modal === "confirm-job-modal" && (
        <DynamicPostJobModal
          modal={modal}
          toggleModal={toggleModal}
          methods={methods}
        />
      )}
      <FormProvider {...methods}>
        <form
          className="content mb-10 bg-white shadow drop-shadow rounded-xl mt-10 py-1 pb-4 px-8 overflow-y-scroll"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {formContent.main.map((formElementContent, index) => (
            <div key={index}>{displayFormElement(formElementContent)}</div>
          ))}
          <PostJobFormElement type="durationModel" />
          <PostJobFormElement type="price" />

          <div>{displayFormElement(formContent.media)}</div>

          <div className="button-Group flex items-center my-2 mt-4 justify-between w-2/3 justify-center mx-auto">
            <Button
              text="Cancel"
              className="bg-red-600 text-white w-24 h-10 hover:bg-red-400 font-bold"
            />
            {selectedSkills.length >= 2 && (
              <Button
                text="Submit"
                type="submit"
                className="bg-green-600 text-white w-24 h-10 mx-auto justify-center items-center flex hover:bg-green-400 font-bold"
              />
            )}
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
