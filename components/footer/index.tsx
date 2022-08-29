/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="top w-full">
        <img src="/footer-gradient.png" alt="footer-gradient" />
      </div>
      <div className="bottom h-40 flex bg-gray-900 ">
        <div className="container flex items-center justify-between m-auto ">
          <Logo />
          <p className="text-white"> © 2022 </p>
        </div>
      </div>
    </footer>
  );
}
