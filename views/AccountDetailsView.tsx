import { useQuery } from "@tanstack/react-query";

import { getWallet } from "@/request/getRequest";
import SpinnerRipple from "@/components/loader/SpinnerRipple";
import Button from "@/components/UI/Button";
import useWalletMutation from "@/hooks/useWalletMutation";

interface Props {
  walletId: string;
}

type accountItemProps = {
  id: string;
  balance: number;
  currency: string;
  received_balance: number;
  on_hold_balance: number;
  reserve_balance: number;
};

export default function AccountDetailsView({ walletId }: Props) {
  const { data, status } = useQuery(["getWallet"], () => getWallet(walletId));
  const { useIssueVirtualHostedCardMutation } = useWalletMutation();
  const { mutate } = useIssueVirtualHostedCardMutation();

  function requestCardHandler(data: { ewallet_contact: string }) {
    return mutate(data);
  }

  console.log("data?.data", data?.data);

  return (
    <>
      <p className="text-xl my-2">
        <span className="text-2xl">🎉</span> Congrats, you now have a wallet
        with us
      </p>
      <h2 className="text-xl">Account Details</h2>
      {status === "error" ? (
        "unable to fetch account details"
      ) : status === "loading" ? (
        <div className="view h-14 mx-auto flex justify-center items-center w-full">
          <SpinnerRipple centerRipple />
        </div>
      ) : (
        <>
          <div className="account-view flex lg:flex-row flex-col items-center my-2 shadow py-4 px-6 rounded-full bg-white justify-between">
            <p>
              <span className="font-bold mr-1">Wallet ID:</span>
              {data?.data.id}
            </p>
            <p>
              <span className="font-bold mr-1">Status:</span>
              <span className="bg-green-500 px-2 text-sm  py-0.5 rounded-full ml-1 text-white">
                Active
              </span>
            </p>
            <p>
              <span className="font-bold mr-1">Category:</span>
              {data.data.category ? data.data.category : "nill"}
            </p>
            <p>
              <span className="font-bold mr-1">Type:</span>
              {data.data.type}
            </p>
          </div>
          <ul className="account-balance">
            {data.data.accounts.map((accountItem: accountItemProps) => {
              return (
                <li
                  key={accountItem.id}
                  className="account-view flex items-center my-2 lg:flex-row flex-col shadow py-4 px-6 rounded-full bg-white justify-between"
                >
                  <h4>
                    <span className="font-bold mr-1">Balance:</span>
                    {accountItem.balance} {accountItem.currency}
                  </h4>
                  <h4>
                    <span className="font-bold  mr-1">Currency:</span>
                    {accountItem.currency}
                  </h4>
                  <h4>
                    <span className="font-bold  mr-1">Received Balance:</span>
                    {accountItem.received_balance} {accountItem.currency}
                  </h4>
                  <h4>
                    <span className="font-bold  mr-1">On Hold Balance:</span>
                    {accountItem.on_hold_balance} {accountItem.currency}
                  </h4>
                  <h4>
                    <span className="font-bold mr-1">Reserve Balance:</span>
                    {accountItem.reserve_balance} {accountItem.currency}
                  </h4>
                </li>
              );
            })}
          </ul>
          <div className="my-4">
            <h5 className="font-bold text-center">
              Apply for your RapydFreelancer Virtual Card, This enables you to
              spend your earnings with ease.
            </h5>
            <Button
              className="mx-auto bg-green-500 px-4 py-1 my-2 rounded-lg hover:opacity-80 flex text-white font-bold"
              text="Apply for Virtual Card"
              onClick={() =>
                requestCardHandler({
                  ewallet_contact: data?.data.contacts.data[0].id,
                })
              }
            />
          </div>
        </>
      )}
    </>
  );
}
