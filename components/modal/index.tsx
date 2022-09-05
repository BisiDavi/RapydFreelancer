import { PropsWithChildren } from "react";

import type { modalStateType } from "@/types/redux-types";

interface Props {
  title?: string;
  toggleModal: (modalStateType: modalStateType) => void;
  modal: modalStateType;
  size?: "large" | "small";
}

export default function Modal({
  children,
  title,
  modal,
  toggleModal,
  size,
}: PropsWithChildren<Props>) {
  const modalSize = size ? `${size} w-auto` : "max-w-2xl w-screen";

  return (
    <>
      {modal ? (
        <>
          <div
            role="dialog"
            className="justify-center h-4/5 site-modal items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className={`relative my-6 mx-auto ${modalSize}`}>
              <div className="border-0 z-40  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {title && (
                  <div className="flex items-start justify-between px-5 py-2 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl flex mx-auto text-center mr-4 pb-0 mb-0 font-semibold">
                      {title}
                    </h3>
                    <button
                      className="hover:bg-red-500 hover:text-white hover:border-white p-1 ml-auto border border-gray-900 rounded-full text-black flex items-center float-right -mr-1 mt-1 text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => toggleModal(null)}
                    >
                      <span className="close text-center h-4 w-4 p-1  flex text-2xl items-center justify-center">
                        ×
                      </span>
                    </button>
                  </div>
                )}
                <div className="relative p-6 flex-auto">{children}</div>
              </div>
            </div>
          </div>
          <div
            className="opacity-50 fixed inset-0 z-50 bg-black"
            onClick={() => toggleModal(null)}
          ></div>
        </>
      ) : null}
      <style jsx>
        {`
          .site-modal {
            z-index: 300;
            height: fit-content;
            width: fit-content;
            margin: auto;
            border: none;
          }
          .close {
            margin-top: -2.5px;
          }
        `}
      </style>
    </>
  );
}
