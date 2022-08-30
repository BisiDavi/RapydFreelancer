import { PropsWithChildren } from "react";
import Head from "next/head";

import Footer from "@/components/footer";
import Header from "@/components/header";
import FooterAlert from "@/components/alerts/FooterAlert";

interface Props {
  title?: string;
}

export default function DefaultLayout({
  children,
  title,
}: PropsWithChildren<Props>) {
  const siteTitle = title ? title : "The Freelancer Marketplace | Hire now";
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
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
