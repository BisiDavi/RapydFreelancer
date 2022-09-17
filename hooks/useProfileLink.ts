import { useRouter } from "next/router";

export default function useProfileLink() {
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

  return { linkHandler, getActiveLink, router };
}
