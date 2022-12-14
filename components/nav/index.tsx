/* eslint-disable @next/next/no-img-element */
import { BsFillPersonFill } from "react-icons/bs";
import { BiLogOut, BiMessageRoundedDetail } from "react-icons/bi";

import Button from "@/components/UI/Button";
import getUserInitials from "@/lib/getUserInitials";
import useHeader from "@/hooks/useHeader";

export default function Nav() {
  const { authHandler, auth, signoutHandler, userProfile, unreadMessages } =
    useHeader();

  const { data, status } = userProfile;

  const profileImage = data?.data[0]?.profileImage;

  return (
    <nav className={`w-4/5 items-center  justify-between lg:flex hidden`}>
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
        <div className="w-2/5 items-center flex justify-end">
          <Button
            text="Login"
            onClick={() => authHandler("login-sidebar")}
            className="text-blue-500 mr-4 font-bold rounded-md hover:text-blue-800"
          />
          <Button
            text="Sign Up"
            onClick={() => authHandler("signup-sidebar")}
            className="border border-blue-500 px-3 py-1 ml-4 font-bold rounded-full text-blue-500 hover:bg-blue-800 hover:text-white"
          />
        </div>
      ) : (
        <div className="justify-between items-center flex">
          <Button
            text={`Hello ${auth?.displayName}`}
            icon={<BsFillPersonFill className="mr-1" />}
            className="text-blue-500 font-bold flex  items-center rounded-md hover:text-blue-800"
            href="/user/profile"
          />
          <div className="message relative ml-3 hover:opacity-70">
            <Button
              icon={<BiMessageRoundedDetail color="#3B81F6" size={30} />}
              href="/user/messages"
              title="unread messages"
            />
            <span className="rounded-full h-5 flex items-center justify-center font-bold absolute -top-2 -right-2 w-5  bg-red-500 text-white">
              {unreadMessages}
            </span>
          </div>
          <Button
            icon={<BiLogOut className="mr-1" />}
            className="border flex items-center mx-4 border-blue-500 px-3 py-1 font-bold rounded-full text-blue-500 hover:bg-blue-800 hover:text-white"
            onClick={signoutHandler}
            title="Sign out"
          />
          {profileImage && status === "success" ? (
            <img
              src={profileImage}
              alt={data?.data[0].name}
              title={data?.data[0].name}
              className="h-14 w-14 rounded-full"
            />
          ) : (
            auth && (
              <div className="user-initials rounded-full text-white bg-gray-500 h-14 w-14 font-bold text-xl flex justify-center items-center">
                {getUserInitials(auth.displayName)}
              </div>
            )
          )}
        </div>
      )}
    </nav>
  );
}
