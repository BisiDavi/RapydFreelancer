/* eslint-disable @next/next/no-img-element */
import { FaSignOutAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import Button from "@/components/UI/Button";
import useHeader from "@/hooks/useHeader";
import getUserInitials from "@/lib/getUserInitials";
import { getMobileSidebarArray } from "@/components/sidebar/mobile-sidebar";
import asideArray from "@/json/sidebar.json";
import useProfileLink from "@/hooks/useProfileLink";

export default function MobileSidebar() {
  const {
    authHandler,
    auth,
    profile,
    signoutHandler,
    toggleMenu,
    unreadMessages,
  } = useHeader();
  const { getActiveLink, linkHandler, router } = useProfileLink();

  const mobileSidebarArray = getMobileSidebarArray(signoutHandler);
  mobileSidebarArray[0].text = auth
    ? `Welcome, ${auth.displayName}`
    : "Hello, Guest";

  return (
    <aside className="w-full h-screen flex items-center fixed overflow-y-scroll top-0 h-screen z-50">
      <div className="content bg-white w-5/6 h-full px-4">
        <div className="flex item-center mx-auto my-10 justify-center">
          {profile ? (
            <img
              src={profile.profileImage}
              alt={profile.name}
              title={profile.name}
              className="h-32 w-32 rounded-full"
            />
          ) : auth ? (
            <div className="user-initials rounded-full text-white bg-gray-500 h-32 w-32 font-bold text-4xl flex justify-center items-center">
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
              {auth !== null && (
                <>
                  <Button
                    icon={item.icon}
                    href={item?.link}
                    title={item.text}
                    text={item.text}
                    className="flex items-center border-b text-blue-500 text-xl my-3 my-2 font-bold"
                  />
                  <span className="rounded-full h-5 flex items-center justify-center font-bold absolute -top-1 left-5 w-5 bg-red-500 text-white">
                    {unreadMessages}
                  </span>
                </>
              )}
            </div>
          ) : (
            <Button
              key={index}
              icon={item.icon}
              href={item?.link}
              title={item.text}
              text={item.text}
              className="text-blue-500 font-bold border-b w-full flex my-3 text-lg items-center rounded-md hover:text-blue-800"
            />
          );
        })}
        {router.asPath.includes("/user") && (
          <>
            <h4 className="font-bold text-xl mt-4">Admin Links</h4>
            <ul className="">
              {asideArray.map((item, index) => {
                const itemClassName =
                  asideArray.length - 1 === index ? "" : "border-b";
                const activeLink = getActiveLink(item);
                return (
                  <li
                    key={item}
                    className={`${activeLink} py-1 font-bold text-blue-500 cursor-pointer text-xl hover:bg-gray-400 my-1 ${itemClassName} px-4 hover:text-white`}
                    onClick={() => linkHandler(item)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <div className="mt-14 flex items-center justify-between">
          {auth === null ? (
            <Button
              text="Login"
              icon={<FaSignOutAlt className="mr-1 tex-xl" size={30} />}
              onClick={() => authHandler("login-sidebar")}
              className="text-blue-500 flex items-center mr-4 font-bold rounded-md hover:text-blue-800"
            />
          ) : (
            <Button
              text="Logout"
              icon={<BiLogOut className="mr-1 tex-xl" size={30} />}
              onClick={signoutHandler}
              className="text-blue-500 flex items-center mr-4 font-bold rounded-md hover:text-blue-800"
            />
          )}
          {auth === null && (
            <Button
              text="Sign Up"
              onClick={() => authHandler("signup-sidebar")}
              className="border border-blue-500 px-3 py-1 ml-4 font-bold rounded-full text-blue-500 hover:bg-blue-800 hover:text-white"
            />
          )}
        </div>
      </div>
      <div
        className="overlay w-1/6 bg-gray-900 opacity-30 h-full cursor-pointer"
        onClick={toggleMenu}
      ></div>
    </aside>
  );
}
