import { useAppDispatch } from "@/hooks/useRedux";
import { updateSidebar } from "@/redux/ui-slice";
import type { PropsWithChildren } from "react";

export default function Sidebar({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  function closeSidebar() {
    dispatch(updateSidebar(null));
  }

  return (
    <div className="sidebarwrapper h-sreen fixed right-0">
      <div
        className="overlay opacity-50 bg-gray-900"
        onClick={closeSidebar}
      ></div>
      <aside className="h-screen w-1/4">{children}</aside>;
    </div>
  );
}
