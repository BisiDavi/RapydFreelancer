/* eslint-disable @next/next/no-img-element */
import { BiLogOut, BiMessageRoundedDetail } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { BsBriefcase, BsFillPersonFill } from "react-icons/bs";

import Button from "@/components/UI/Button";
import useHeader from "@/hooks/useHeader";
import getUserInitials from "@/lib/getUserInitials";
import { AiOutlineSearch } from "react-icons/ai";

export default function MobileSidebar() {
  const {
    authHandler,
    auth,
    profile,
    signoutHandler,
    toggleMenu,
    unreadMessages,
  } = useHeader();
  return (
    <aside className="w-full h-screen flex items-center fixed top-0 h-screen z-50">
      <div className="content bg-white w-4/5 h-full px-4">
        <div className="flex item-center mx-auto my-10 justify-center">
          {profile ? (
            <img
              src={profile.profileImage}
              alt={profile.name}
              title={profile.name}
              className="h-32 w-32 rounded-full"
            />
          ) : (
            auth && (
              <div className="user-initials rounded-full text-white bg-gray-500 h-32 w-32 font-bold text-xl flex justify-center items-center">
                {getUserInitials(auth.displayName)}
              </div>
            )
          )}
        </div>
        <Button
          text={`Hello, ${auth?.displayName}`}
          icon={<BsFillPersonFill className="mr-1" />}
          className="text-blue-500 font-bold flex my-4 mt-8 items-center rounded-md hover:text-blue-800"
          href="/user/profile"
        />
        <div className="message relative my-2 hover:opacity-70">
          <Button
            icon={
              <BiMessageRoundedDetail
                color="#3B81F6"
                className="mr-2"
                size={30}
              />
            }
            href="/user/messages"
            title="unread messages"
            text="unread messages"
            className="flex items-center text-blue-500 my-2 font-bold"
          />
          <span className="rounded-full h-5 flex items-center justify-center font-bold absolute -top-1 left-5 w-5 bg-red-500 text-white">
            {unreadMessages}
          </span>
        </div>
        <div className="flex flex-col">
          <Button
            text="Find Work"
            href="/jobs"
            icon={<AiOutlineSearch className="mr-1 text-xl" />}
            className="text-blue-500 flex items-center  my-2 font-bold text-white hover:bg-blue-800"
          />
          <Button
            text="Post a Job"
            href="/post-job"
            icon={<BsBriefcase className="mr-1 text-xl" />}
            className="text-blue-500 flex items-center font-bold my-2 text-white hover:bg-blue-800"
          />
          <Button
            icon={<BiLogOut className="mr-1 text-xl font-bold" />}
            className="flex items-center my-2 font-bold rounded-full text-blue-500 hover:bg-blue-800 hover:text-white"
            onClick={signoutHandler}
            title="Sign out"
            text="Sign out"
          />
        </div>
        <div className="mt-14 flex items-center justify-between">
          <Button
            text="Login"
            icon={<FaSignOutAlt className="mr-1 tex-xl" />}
            onClick={() => authHandler("login-sidebar")}
            className="text-blue-500 flex items-center mr-4 font-bold rounded-md hover:text-blue-800"
          />
          <Button
            text="Sign Up"
            onClick={() => authHandler("signup-sidebar")}
            className="border border-blue-500 px-3 py-1 ml-4 font-bold rounded-full text-blue-500 hover:bg-blue-800 hover:text-white"
          />
        </div>
      </div>
      <div
        className="overlay w-1/5 bg-gray-900 opacity-30 h-full cursor-pointer"
        onClick={toggleMenu}
      ></div>
    </aside>
  );
}
