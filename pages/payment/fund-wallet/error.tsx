/* eslint-disable @next/next/no-img-element */
import Button from "@/components/UI/Button";
import DefaultLayout from "@/layout/DefaultLayout";

export default function FundWalletPaymentError() {
  return (
    <DefaultLayout title="Your Profile">
      <section className="container flex items-start mx-auto my-10">
        <div className="content w-full mx-auto flex flex-col justify-center p-6  ml-4 rounded  bg-gray-100">
          <img
            src="/error-icon.webp"
            alt="successful"
            className="w-1/6 mx-auto rounded-full h-40 w-40"
          />
          <h4 className="font-bold text-center my-4">
            Error Funding Wallet
          </h4>
          <div className="button-group w-1/3 mx-auto justify-between flex items-center">
            <Button
              text="Retry"
              className="py-1 bg-green-500 hover:opacity-80 text-white px-6 rounded-md"
              href="/user/account"
            />
            <Button
              text="Home"
              className="py-1 bg-red-500 text-white px-6 rounded-md hover:opacity-80"
              href="/"
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
