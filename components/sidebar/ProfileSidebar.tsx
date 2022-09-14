import { useRouter } from "next/router";

const asideArray = [
  "Profile",
  "Posted Jobs",
  "Bids",
  "Messages",
  "Chat",
  "Settings",
];

export default function ProfileSidebar() {
  const router = useRouter();
  const { slug }: any = router.query;
  const slugItem: string = slug ? slug[0] : "";

  const getActiveLink = (item: string) =>
    item.toLocaleLowerCase().includes(slugItem) ? "text-red-500" : "";

  function linkHandler(link: string) {
    const pageLink = link.toLowerCase();
    router.query.slug = pageLink;
    router.push(router);
  }
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
