import Homebanner from "@/components/banners/Homebanner";
import InfoBanner from "@/components/banners/InfoBanner";
import Container from "@/components/UI/Container";
import DefaultLayout from "@/layout/DefaultLayout";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Container>
        <Homebanner />
        <InfoBanner />
      </Container>
    </DefaultLayout>
  );
};

export default Home;
