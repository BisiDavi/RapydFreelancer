import Logo from "@/components/logo";
import Button from "@/components/UI/Button";
import useScroll from "@/hooks/useScroll";

export default function Header() {
  const { scroll } = useScroll();
  const headerClassname = scroll > 80 ? "fixed" : "";
  return (
    <header
      className={`flex w-full bg-white z-50 items-center shadow py-3 ${headerClassname}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <div className="w-1/3 justify-between flex">
          <Button
            text="Login"
            className="text-blue-500 font-bold rounded-md hover:text-blue-800"
          />
          <Button
            text="Sign Up"
            className="border border-blue-500 px-6 py-1.5 font-bold rounded-full text-blue-500 hover:bg-blue-800 hover:text-white"
          />
          <Button
            text="Post a Job"
            className="bg-blue-500 px-6 py-1.5 font-bold rounded-full text-white hover:bg-blue-800"
          />
        </div>
      </div>
    </header>
  );
}
