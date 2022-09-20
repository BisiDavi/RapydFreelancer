/* eslint-disable @next/next/no-img-element */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import DefaultLayout from "@/layout/DefaultLayout";
import Button from "@/components/UI/Button";
import { SpinnerLoader } from "@/components/loader/SpinnerRipple";
import useAuth from "@/hooks/useAuth";
import { updateUserAfterActivatingCard } from "@/request/postRequest";

export default function CardActivationSuccessful() {
  const { authDetails } = useAuth();
  const auth = authDetails();
  const userEmail: string | any = auth?.email;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { status } = useQuery(
    ["updateJobAfterHired"],
    () => updateUserAfterActivatingCard(userEmail),
    {
      enabled: !!userEmail,
      onSuccess: () => {
        queryClient.invalidateQueries(["getUserProfile"]);
        router.push("/user/profile");
      },
    }
  );

  return (
    <DefaultLayout title="Your Profile">
      {status === "error" ? (
        <p className="font-bold text-center justify-center items-center my-40 text-xl">
          unable to update your profile after activating card
        </p>
      ) : status === "loading" ? (
        <SpinnerLoader
          className="h-screen bg-white opacity-80 mx-auto justify-center items-center fixed top-0"
          loadingText="Please wait, reconcilling with the payment gateway"
        />
      ) : (
        status === "success" && (
          <section className="container flex items-start mx-auto my-10">
            <div className="content w-full mx-auto flex flex-col  justify-center  p-6 item-start ml-4 rounded  bg-gray-100">
              <img
                src="/checkmark.gif"
                alt="successful"
                className="w-1/6 mx-auto rounded-full"
              />
              <h4 className="font-bold text-center my-4">
                Card Successful Activated Congrats 🎉, make sure you don&#39;t
                forget your pin. 
              </h4>
              <Button
                text="Home"
                href="/"
                className="py-1 bg-green-500 flex mx-auto justify-center hover:opacity-80 text-white px-6 rounded-md"
              />
            </div>
          </section>
        )
      )}
    </DefaultLayout>
  );
}
