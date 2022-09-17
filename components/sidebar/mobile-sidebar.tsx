import { BiLogOut, BiMessageRoundedDetail } from "react-icons/bi";
import { BsBriefcase, BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

export const getMobileSidebarArray = (signoutHandler: () => void) => [
  {
    text: "",
    icon: <BsFillPersonFill className="mr-2 text-xl" size={30} />,
    link: "/",
  },
  {
    text: "Unread messages",
    icon: <BiMessageRoundedDetail className="mr-2 text-xl" size={30} />,
    link: "/user/messages",
  },
  {
    text: "Find Work",
    icon: <AiOutlineSearch className="mr-2 text-xl" size={30} />,
    link: "/jobs",
  },
  {
    text: "Post a Job",
    icon: <BsBriefcase className="mr-2 text-xl" size={30} />,
    link: "/post-job",
  },
];
