import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { profileSchema } from "@/components/form/schema/profileSchema";
import profileFormContent from "@/json/profile-form.json";
import displayFormElement from "@/lib/displayFormElement";
import Button from "@/components/UI/Button";
import useProfileForm from "@/hooks/useProfileForm";

export default function ProfileForm() {
  const methods = useForm({
    resolver: yupResolver(profileSchema),
    mode: "all",
  });

  const { createWallet } = useProfileForm();

  function onSubmitHandler(data: any) {
    console.log("data", data);
  }

  return (
    <FormProvider {...methods}>
      <form
        className="w-4/5 mx-auto bg-white  p-4 px-4 rounded my-4"
        onSubmit={methods.handleSubmit(onSubmitHandler)}
      >
        {profileFormContent.map((formItem, index) => (
          <div key={index} className="form-group flex justify-between">
            {formItem.map((formElement) => (
              <div key={formElement.name} className="w-1/2 mx-3">
                {displayFormElement(formElement)}{" "}
              </div>
            ))}
          </div>
        ))}
        <Button
          text="Submit"
          type="submit"
          className="bg-blue-500 text-white mt-4 px-4 py-1 mx-auto flex rounded hover:bg-blue-900"
        />
      </form>
    </FormProvider>
  );
}
