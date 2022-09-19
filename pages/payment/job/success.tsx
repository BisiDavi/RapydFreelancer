/* eslint-disable @next/next/no-img-element */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import DefaultLayout from "@/layout/DefaultLayout";
import Button from "@/components/UI/Button";
import useJob from "@/hooks/useJob";
import { SpinnerLoader } from "@/components/loader/SpinnerRipple";

export default function JobPaymentSuccessful() {
  const { router, hire, resetHired, updateJobAfterHired } = useJob();
  const queryClient = useQueryClient();
  const { status } = useQuery(["updateJobAfterHired"], () => updateJobAfterHired, {
    enabled: !!(hire !== null),
    onSuccess: () => {
      resetHired();
      queryClient.invalidateQueries(["getUserProfile"]);
      router.push("/user/profile");
    },
  });

  return (
    <DefaultLayout title="Your Profile">
      {status === "error" ? (
        "unable to update connect payment"
      ) : status === "loading" ? (
        <SpinnerLoader
          className="h-screen bg-white opacity-80 mx-auto justify-center items-center fixed top-0"
          loadingText="Please wait, reconcilling with payment gateway"
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
                Job Payment Successful, Congrats
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
