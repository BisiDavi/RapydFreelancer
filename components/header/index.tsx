import Logo from "@/components/logo";
import Button from "@/components/UI/Button";

export default function Header() {
  return (
    <>
      <title>Rapyd Freelancers | The Freelancer Marketplace | Hire now</title>
      <meta
        name="description"
        content="Hire a freelancer for that your project for quick and reliable execution"
      />
      <link rel="icon" href="/favicon.ico" />
      <header className="flex w-full   items-center shadow py-3">
        <div className="container mx-auto flex items-center justify-between">
          <Logo />
          <div className="w-1/3 justify-between flex">
            <Button
              text="Login"
              className="text-blue-500 font-bold rounded-md text-white hover:text-blue-800"
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
    </>
  );
}
