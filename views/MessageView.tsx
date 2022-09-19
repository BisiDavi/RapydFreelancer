import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { SpinnerLoader } from "@/components/loader/SpinnerRipple";
import useHeader from "@/hooks/useHeader";
import MessageViewItem from "./MessageViewItem";

export default function MessageView() {
  const queryClient = useQueryClient();
  const { userProfile } = useHeader();

  const { data, status } = userProfile;

  const messages = status === "success" ? data.data[0].messages : [];

  function isMessageRead(id: string) {
    let readMessage: any = messages.filter((item: any) => item.id === id)[0];
    return readMessage.read ? "read" : "unread";
  }

  const unreadMessages =
    status === "success"
      ? data.data[0].messages.filter((item: any) => !item.read).length
      : 0;

  function onClickHandler(id: string) {
    let readMessage: any = messages.filter((item: any) => item.id === id)[0];
    if (!readMessage.read) {
      axios
        .put("/api/db", {
          collection: "users",
          query: { email: data?.data[0].email, "messages.id": readMessage.id },
          data: {
            $set: { "messages.$.read": true },
          },
        })
        .then(() => {
          queryClient.invalidateQueries(["getUserProfile"]);
        });
    }
  }

  return (
    <div>
      <h4 className="text-center text-xl my-4 font-bold">View your Inbox</h4>
      {status === "error" ? (
        "unable to messages"
      ) : status === "loading" ? (
        <SpinnerLoader loadingText="Fetching messages..." />
      ) : (
        <>
          <h6 className="my-1 text-blue-500 font-bold">
            Total Messages: {data.data[0].messages?.length} message(s)
          </h6>
          <h6 className="my-1 mb-4 text-blue-500 font-bold">
            unread messages: {unreadMessages} message(s)
          </h6>

          {messages.length > 0 ? (
            <ul>
              {messages.map((item: any) => {
                const messageStatus = isMessageRead(item.id);
                const statusStyle =
                  messageStatus === "read" ? "text-red-500" : "text-blue-500";
                return (
                  <MessageViewItem
                    item={item}
                    key={item.id}
                    onClickHandler={onClickHandler}
                    messages={messages}
                  />
                );
              })}
            </ul>
          ) : (
            <p className="text-center text-xl font-bold">
              Oops no messages yet
            </p>
          )}
        </>
      )}
    </div>
  );
}
