import { BsFillPersonFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

import Logo from "@/components/logo";
import Button from "@/components/UI/Button";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useRedux";
import useScroll from "@/hooks/useScroll";
import { updateSidebar } from "@/redux/ui-slice";
import { UIStateType } from "@/types/redux-types";

export default function Header() {
  const { scroll } = useScroll();
  const dispatch = useAppDispatch();
  const { authDetails } = useAuth();

  const auth: any = authDetails();

  console.log("auth", auth?.currentUser);

  const headerClassname = scroll > 80 ? "fixed" : "";

  function authHandler(authValue: UIStateType["sidebar"]) {
    dispatch(updateSidebar(authValue));
  }

  return (
    <header
      className={`flex w-full bg-white z-50 items-center shadow py-3 ${headerClassname}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <div className="w-2/5 justify-between flex">
          {auth === null ? (
            <>
              <Button
                text="Login"
                onClick={() => authHandler("login-sidebar")}
                className="text-blue-500 font-bold rounded-md hover:text-blue-800"
              />
              <Button
                text="Sign Up"
                onClick={() => authHandler("signup-sidebar")}
                className="border border-blue-500 px-6 py-1.5 font-bold rounded-full text-blue-500 hover:bg-blue-800 hover:text-white"
              />
            </>
          ) : (
            <div className="justify-between items-center w-2/3 flex">
              <Button
                text={`Hello ${auth?.currentUser?.displayName}`}
                icon={<BsFillPersonFill className="mr-1" />}
                className="text-blue-500 font-bold flex items-center rounded-md hover:text-blue-800"
              />
              <Button
                text="Sign out"
                icon={<FaSignOutAlt className="mr-1" />}
                className="border flex items-center border-blue-500 px-6 py-1.5 font-bold rounded-full text-blue-500 hover:bg-blue-800 hover:text-white"
              />
            </div>
          )}
          <Button
            text="Post a Job"
            href="/post-job"
            className="bg-blue-500 px-6 py-1.5 font-bold rounded-full text-white hover:bg-blue-800"
          />
        </div>
      </div>
    </header>
  );
}
