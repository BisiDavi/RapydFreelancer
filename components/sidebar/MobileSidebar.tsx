/* eslint-disable @next/next/no-img-element */
import { FaSignOutAlt } from "react-icons/fa";

import Button from "@/components/UI/Button";
import useHeader from "@/hooks/useHeader";
import getUserInitials from "@/lib/getUserInitials";
import { getMobileSidebarArray } from "@/json/mobile-sidebar";

export default function MobileSidebar() {
  const {
    authHandler,
    auth,
    profile,
    signoutHandler,
    toggleMenu,
    unreadMessages,
  } = useHeader();
  const mobileSidebarArray = getMobileSidebarArray(signoutHandler);
  mobileSidebarArray[0].text = auth
    ? `Welcome, ${auth.displayName}`
    : "Hello, Guest";
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
          ) : auth ? (
            <div className="user-initials rounded-full text-white bg-gray-500 h-32 w-32 font-bold text-xl flex justify-center items-center">
              {getUserInitials(auth.displayName)}
            </div>
          ) : (
            <div className="user-initials rounded-full text-white bg-gray-500 h-32 w-32 font-bold text-xl flex justify-center items-center">
              Guest
            </div>
          )}
        </div>
        {mobileSidebarArray.map((item, index) => {
          return item.text === "Unread messages" ? (
            <div key={index} className="message relative my-2 hover:opacity-70">
              <Button
                icon={item.icon}
                href={item?.link}
                title={item.text}
                text={item.text}
                className="flex items-center text-blue-500 text-xl my-3 my-2 font-bold"
              />
              <span className="rounded-full h-5 flex items-center justify-center font-bold absolute -top-1 left-5 w-5 bg-red-500 text-white">
                {unreadMessages}
              </span>
            </div>
          ) : (
            <Button
              key={index}
              icon={item.icon}
              href={item?.link}
              title={item.text}
              text={item.text}
              onClick={item.method}
              className="text-blue-500 font-bold flex my-3 text-lg items-center rounded-md hover:text-blue-800"
            />
          );
        })}
        <div className="mt-14 flex items-center justify-between">
          <Button
            text="Login"
            icon={<FaSignOutAlt className="mr-1 tex-xl" size={30} />}
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
