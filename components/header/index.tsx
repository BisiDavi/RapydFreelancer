import Logo from "@/components/logo";
import useHeader from "@/hooks/useHeader";
import Nav from "@/components/nav";

export default function Header() {
  const { headerClassname } = useHeader();

  return (
    <header
      className={`flex w-full bg-white z-50 items-center shadow py-3 ${headerClassname}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-0">
        <Logo />
        <Nav />
      </div>
    </header>
  );
}
