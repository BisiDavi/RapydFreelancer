import { Fragment, useState } from "react";

interface Props {
  messages: [];
  onClickHandler: (id: string) => void;
  item: {
    id: string;
    title: string;
    message: [];
  };
}

export default function MessageViewItem({
  item,
  onClickHandler,
  messages,
}: Props) {
  const [showMessage, setShowMessage] = useState(false);

  function isMessageRead(id: string) {
    let readMessage: any = messages.filter((item: any) => item.id === id)[0];
    return readMessage.read ? "read" : "unread";
  }

  const messageStatus = isMessageRead(item.id);
  const statusStyle =
    messageStatus === "read" ? "text-red-500" : "text-blue-500";

  function onMessageHandler() {
    setShowMessage(!showMessage);
    onClickHandler(item.id);
  }

  return (
    <li className="bg-white my-2 w-full">
      <div
        className="title  flex-col py-2 lg:flex-row flex mx-auto lg:items-center px-4 shadow w-full relative  cursor-pointer"
        onClick={onMessageHandler}
      >
        <h4 className="text-base lg:text-xl font-medium">{item.title}...</h4>
        <small className="lg:text-right lg:absolute text-red-500 lg:right-4">
          <span className={`mx-1 ${statusStyle}`}>({messageStatus})</span>
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
  );
}
