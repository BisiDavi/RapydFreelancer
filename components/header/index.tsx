import { BsFillPersonFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

import Logo from "@/components/logo";
import Button from "@/components/UI/Button";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch } from "@/hooks/useRedux";
import useScroll from "@/hooks/useScroll";
import { updateSidebar } from "@/redux/ui-slice";
import { UIStateType } from "@/types/redux-types";
import useAuthMutation from "@/hooks/useAuthMutation";
import { BiMessageRoundedDetail } from "react-icons/bi";

export default function Header() {
  const { scroll } = useScroll();
  const dispatch = useAppDispatch();
  const { authDetails } = useAuth();
  const { useSignoutMutation } = useAuthMutation();
  const { mutate } = useSignoutMutation();

  const auth: any = authDetails();

  const authStyle = auth ? "w-4/5" : "w-2/5";

  function signoutHandler() {
    return mutate({});
  }

  const headerClassname = scroll > 80 ? "fixed" : "";

  function authHandler(authValue: UIStateType["sidebar"]) {
    dispatch(updateSidebar(authValue));
  }

  return (
    <header
      className={`flex w-full bg-white z-50 items-center shadow-xl py-3 ${headerClassname}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <div className={`${authStyle} items-center  justify-between flex`}>
          <div>
            <Button
              text="Find Work"
              href="/jobs"
              className="bg-blue-500 px-3 py-1.5 mx-4 font-bold rounded-full text-white hover:bg-blue-800"
            />
            <Button
              text="Post a Job"
              href="/post-job"
              className="bg-blue-500 px-3 py-1.5 font-bold rounded-full text-white hover:bg-blue-800"
            />
          </div>
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
            <div className="justify-between items-center flex">
              <Button
                text={`Hello ${auth?.displayName}`}
                icon={<BsFillPersonFill className="mr-1" />}
                className="text-blue-500 font-bold flex  items-center rounded-md hover:text-blue-800"
              />
              <div className="message relative">
                <Button
                  icon={<BiMessageRoundedDetail color="#3B81F6" size={30} />}
                  className="ml-4"
                />
                <span className="rounded-full h-5 flex items-center justify-center font-bold absolute -top-2 -right-2 w-5  bg-red-500 text-white">
                  1
                </span>
              </div>
              <Button
                text="Sign out"
                icon={<FaSignOutAlt className="mr-1" />}
                className="border flex items-center mx-4 border-blue-500 px-3 py-1 font-bold rounded-full text-blue-500 hover:bg-blue-800 hover:text-white"
                onClick={signoutHandler}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
