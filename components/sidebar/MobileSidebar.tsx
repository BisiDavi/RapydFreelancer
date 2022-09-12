/* eslint-disable @next/next/no-img-element */
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

import Button from "@/components/UI/Button";
import useHeader from "@/hooks/useHeader";
import getUserInitials from "@/lib/getUserInitials";


export default function MobileSidebar() {
  const {
    authHandler,
    auth,
    profile,
    signoutHandler,
    unreadMessages,
    headerClassname,
  } = useHeader();
  return (
    <aside>
      <div className="top flex shadow flex item-center justify-between">
        <Button
          text={`Hello ${auth?.displayName}`}
          icon={<BsFillPersonFill className="mr-1" />}
          className="text-blue-500 font-bold flex  items-center rounded-md hover:text-blue-800"
          href="/user/profile"
        />
        {profile ? (
          <img
            src={profile.profileImage}
            alt={profile.name}
            title={profile.name}
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
    </aside>
  );
}
