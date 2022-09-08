import Button from "@/components/UI/Button";

export default function JobPostingPaymentForm() {
  return (
    <div>
      <h3 className="text-center text-xl">
        Deposit Money to Escrow for this Job by making Payment Now, You can
        choose to pay for this job later by skipping payment
      </h3>
      <p className="font-medium text-center">
        By paying now, your job listing will be approved, this will attract more
        bid from RapydFreelancers
      </p>

      <div className="button-Group flex items-center my-2 mt-4 justify-between w-2/3 justify-center mx-auto">
        <Button
          text="Skip Payment (Pay later)"
          className="bg-red-600 text-white w-24 h-10 hover:bg-red-400 font-bold"
        />
        <Button
          text="Make Payment"
          className="bg-green-600 text-white w-24 h-10 mx-auto justify-center items-center flex hover:bg-green-400 font-bold"
        />
      </div>
    </div>
  );
}
