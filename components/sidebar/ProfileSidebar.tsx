import asideArray from "@/json/sidebar.json";
import useProfileLink from "@/hooks/useProfileLink";

export default function ProfileSidebar() {
  const { getActiveLink, linkHandler } = useProfileLink();

  return (
    <aside className="w-1/5 bg-gray-100 py-10 h-full">
      <ul>
        {asideArray.map((item, index) => {
          const itemClassName =
            asideArray.length - 1 === index ? "" : "border-b";
          const activeLink = getActiveLink(item);
          return (
            <li
              key={item}
              className={`${activeLink} py-1 font-bold cursor-pointer text-xl hover:bg-gray-400 my-1 ${itemClassName} px-4 hover:text-white`}
              onClick={() => linkHandler(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
