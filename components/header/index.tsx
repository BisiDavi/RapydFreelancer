import dynamic from "next/dynamic";

import Logo from "@/components/logo";
import useHeader from "@/hooks/useHeader";
import useMediaQuery from "@/hooks/useMediaQuery";

const DynamicNav = dynamic(
  () => import(/* webpackChunkName: 'DynamicNav' */ "@/components/nav")
);

const MenuBar = dynamic(
  () => import(/* webpackChunkName: 'MenuBar' */ "@/components/UI/MenuBar")
);

export default function Header() {
  const { headerClassname, sidebar, toggleMenu } = useHeader();
  const mobileDevice = useMediaQuery("(max-width:768px)");

  const sidebarState = sidebar === "mobile-sidebar" ? "menu opened" : "menu";

  return (
    <header
      className={`flex w-full bg-white z-40 items-center shadow py-3 ${headerClassname}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-0">
        <Logo />
        {!mobileDevice ? (
          <DynamicNav />
        ) : (
          <MenuBar className={sidebarState} onClick={toggleMenu} />
        )}
      </div>
    </header>
  );
}
