import { PropsWithChildren } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAppSelector } from "@/hooks/useRedux";

interface Props {
  title?: string;
}

const DynamicSidebar = dynamic(
  () => import(/* webpackChunkName: 'Sidebar' */ "@/components/sidebar")
);

export default function DefaultLayout({
  children,
  title,
}: PropsWithChildren<Props>) {
  const siteTitle = title ? title : "The Freelancer Marketplace | Hire now";
  const { sidebar } = useAppSelector((state) => state.UI);
  return (
    <>
      <Head>
        <title>Rapyd Freelancers | {siteTitle}</title>
        <meta
          name="description"
          content="Hire a freelancer for that your project for quick and reliable execution"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {sidebar !== null && <DynamicSidebar />}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
