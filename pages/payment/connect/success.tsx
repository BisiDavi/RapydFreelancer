/* eslint-disable @next/next/no-img-element */
import { useQuery, useQueryClient } from "@tanstack/react-query";

import DefaultLayout from "@/layout/DefaultLayout";
import Button from "@/components/UI/Button";
import useConnect from "@/hooks/useConnect";

export default function ConnectPaymentSuccessful() {
  const { updateConnectAfterPayment, connect, resetConnect } = useConnect();
  const queryClient = useQueryClient();
  const { data, status } = useQuery(
    ["updateConnect"],
    updateConnectAfterPayment,
    {
      enabled: !!connect,
      onSuccess: () => {
        resetConnect();
        queryClient.invalidateQueries(["getUserProfile"]);
      },
    }
  );

  console.log("data.data", data?.data);

  return (
    <DefaultLayout title="Your Profile">
      <section className="container flex items-start mx-auto my-10">
        <div className="content w-full mx-auto flex flex-col  justify-center  p-6 item-start ml-4 rounded  bg-gray-100">
          <img
            src="/checkmark.gif"
            alt="successful"
            className="w-1/6 mx-auto rounded-full"
          />
          <h4 className="font-bold text-center my-4">
            Connect Purchase Successful, Congrats
          </h4>
          <Button
            text="Home"
            href="/"
            className="py-1 bg-green-500 flex mx-auto justify-center hover:opacity-80 text-white px-6 rounded-md"
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
