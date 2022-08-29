import Providerlayout from "@/layout/ProviderLayout";

import type { AppProps } from "next/app";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providerlayout>
      <Component {...pageProps} />
    </Providerlayout>
  );
}

export default MyApp;
