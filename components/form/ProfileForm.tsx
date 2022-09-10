import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "@/components/form/schema/profileSchema";

import profileFormContent from "@/json/profile-form.json";
import displayFormElement from "@/lib/displayFormElement";

export default function ProfileForm() {
  const methods = useForm({
    resolver: yupResolver(profileSchema),
    mode: "all",
  });
  return (
    <FormProvider {...methods}>
      <form className="w-4/5 mx-auto bg-white  p-4 px-4 rounded my-4">
        {profileFormContent.map((formItem, index) => (
          <div key={index} className="form-group flex justify-between">
            {formItem.map((formElement) => (
              <div key={formElement.name} className="w-1/2 mx-3">
                {displayFormElement(formElement)}{" "}
              </div>
            ))}
          </div>
        ))}
      </form>
    </FormProvider>
  );
}
