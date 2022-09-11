import { PropsWithChildren } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useAppSelector } from "@/hooks/useRedux";

interface Props {
  title?: string;
  className?: string;
}

const DynamicAuthSidebar = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AuthSidebar' */ "@/components/sidebar/AuthSidebar"
    )
);

export default function DefaultLayout({
  children,
  title,
  className,
}: PropsWithChildren<Props>) {
  const siteTitle = title ? title : "The Freelancer Marketplace | Hire now";
  const { sidebar } = useAppSelector((state) => state.UI);
  const layoutStyle = className ? className : "";
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
      {sidebar !== null && <DynamicAuthSidebar />}
      <Header />
      <main className={layoutStyle}>{children}</main>
      <Footer />
    </>
  );
}
