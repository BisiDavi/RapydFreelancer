import { useAppDispatch } from "@/hooks/useRedux";
import { updateSidebar } from "@/redux/ui-slice";
import type { PropsWithChildren } from "react";

export default function Sidebar({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  function closeSidebar() {
    dispatch(updateSidebar(null));
  }

  return (
    <>
      <div className="sidebarwrapper flex w-screen h-sreen fixed right-0">
        <div
          className="overlay h-screen opacity-50 bg-gray-900 w-1/6 lg:w-3/4 cursor-pointer"
          onClick={closeSidebar}
        ></div>
        <aside className="h-screen w-5/6 lg:w-1/4 bg-white flex justify-center m-auto p-4">
          {children}
        </aside>
      </div>
      <style jsx>
        {`
          .sidebarwrapper {
            z-index: 100;
          }
        `}
      </style>
    </>
  );
}
