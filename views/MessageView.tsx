import { Fragment, useState } from "react";

import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { updateReadMessage } from "@/redux/user-slice";

export default function MessageView() {
  const { messages } = useAppSelector((state) => state.user);
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useAppDispatch();

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
      <ul>
        {messages.map((item) => (
          <li key={item.id} className="bg-white w-full">
            <div
              className="title h-12 flex mx-auto items-center px-4 shadow w-full relative  cursor-pointer"
              onClick={() => onClickHandler(item.id)}
            >
              <h4 className="text-xl font-medium">{item.title}...</h4>
              <small className="text-right absolute text-red-500 right-4">
                click to read more
              </small>
            </div>
            {showMessage && (
              <div className="message text-lg p-4">
                {item.message.map((messageGroup: string[], index: number) => {
                  return (
                    <Fragment key={index}>
                      {messageGroup.map((message) => (
                        <p key={message} className="my-2">
                          {message}
                        </p>
                      ))}
                    </Fragment>
                  );
                })}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
