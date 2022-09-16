import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import axios from "axios";

import useAuth from "@/hooks/useAuth";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { updateUserProfile } from "@/redux/user-slice";
import { getUserProfile } from "@/request/getRequest";
import { SpinnerLoader } from "@/components/loader/SpinnerRipple";

export default function MessageView() {
  const { authDetails } = useAuth();
  const auth: any = authDetails();
  const { profile } = useAppSelector((state) => state.user);
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { data, status } = useQuery(
    ["getUserProfile"],
    () => getUserProfile(auth?.email),
    {
      enabled: !!auth?.email && profile === null,
      onSuccess(data) {
        if (!profile) {
          dispatch(updateUserProfile(data?.data[0]));
        }
      },
    }
  );

  const messages = status === "success" ? data?.data[0].messages : [];

  function isMessageRead(id: string) {
    let readMessage: any = messages.filter((item: any) => item.id === id)[0];
    return readMessage.read ? "read" : "unread";
  }

  const unreadMessages =
    status === "success"
      ? data.data[0].messages.filter((item: any) => !item.read).length
      : 0;

  function onClickHandler(id: string) {
    setShowMessage(!showMessage);
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
                  <li key={item.id} className="bg-white w-full">
                    <div
                      className="title h-12 flex mx-auto items-center px-4 shadow w-full relative  cursor-pointer"
                      onClick={() => onClickHandler(item.id)}
                    >
                      <h4 className="text-xl font-medium">{item.title}...</h4>
                      <small className="text-right absolute text-red-500 right-4">
                        <span className={`mx-1 ${statusStyle}`}>
                          ({messageStatus})
                        </span>
                        click to read more
                      </small>
                    </div>
                    {showMessage && (
                      <div className="message text-lg p-4">
                        {item.message.map(
                          (messageGroup: string[], index: number) => {
                            return (
                              <Fragment key={index}>
                                {messageGroup.map((message) => (
                                  <p key={message} className="my-2">
                                    {message}
                                  </p>
                                ))}
                              </Fragment>
                            );
                          }
                        )}
                      </div>
                    )}
                  </li>
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
