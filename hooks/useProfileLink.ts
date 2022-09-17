import { useRouter } from "next/router";
import useHeader from "./useHeader";
import useMediaQuery from "./useMediaQuery";

export default function useProfileLink() {
  const router = useRouter();
  const { toggleMenu } = useHeader();
  const mobileView = useMediaQuery("(max-width:768px)");

  const { slug }: any = router.query;
  const slugItem: string = slug ? slug[0] : "";

  const getActiveLink = (item: string) =>
    item.toLocaleLowerCase().includes(slugItem) ? "text-red-500" : "";

  function linkHandler(link: string) {
    const pageLink = link.toLowerCase();
    router.query.slug = pageLink;
    router.push(router);
    if (mobileView) {
      toggleMenu();
    }
  }

  return { linkHandler, getActiveLink, router };
}
