import { useRouter } from "next/router";
import useHeader from "./useHeader";
import useMediaQuery from "./useMediaQuery";

export default function useProfileLink() {
  const router = useRouter();
  const { toggleMenu } = useHeader();
  const mobileView = useMediaQuery("(max-width:768px)");

  const getActiveLink = (item: string) => {
    const itemLowerCase = item.toLowerCase();
    return router.asPath.includes(itemLowerCase) ? "text-red-500" : "";
  };

  function linkHandler(link: string) {
    const pageLink = link.toLowerCase();
    const pageRoute = `/user/${pageLink}`;
    router.push(pageRoute);
    if (mobileView) {
      toggleMenu();
    }
  }

  return { linkHandler, getActiveLink, router };
}
