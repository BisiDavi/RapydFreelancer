import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";

import useAuth from "@/hooks/useAuth";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { updateReadMessage, updateUserProfile } from "@/redux/user-slice";
import { getUserProfile } from "@/request/getRequest";

export default function MessageView() {
  const { authDetails } = useAuth();
  const auth: any = authDetails();
  const { messages, profile } = useAppSelector((state) => state.user);
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useAppDispatch();

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

  function isMessageRead(id: string) {
    let readMessage: any = messages.filter((item) => item.id === id)[0];
    return readMessage.read ? "read" : "unread";
  }

  const unreadMessages = messages.filter((item) => !item.read).length;

  function onClickHandler(id: string) {
    setShowMessage(!showMessage);
    let readMessage: any = messages.filter((item) => item.id === id)[0];
    if (!readMessage.read) {
      const readMessageIndex = messages.findIndex((item) => item.id === id);
      const updatedMessage = { ...readMessage, read: true };
      dispatch(
        updateReadMessage({ index: readMessageIndex, message: updatedMessage })
      );
    }
  }

  return (
    <div>
      <h4 className="text-center text-xl my-4 font-bold">View your Inbox</h4>
      <h6 className="my-1 text-blue-500 font-bold">
        Total Messages: {messages.length} message(s)
      </h6>
      <h6 className="my-1 mb-4 text-blue-500 font-bold">
        unread messages: {unreadMessages} message(s)
      </h6>

      {messages.length > 0 ? (
        <ul>
          {messages.map((item) => {
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
        <p className="text-center text-xl font-bold">Oops no messages yet</p>
      )}
    </div>
  );
}
