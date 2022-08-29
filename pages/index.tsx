import Homebanner from "@/components/banners/Homebanner";
import InfoBanner from "@/components/banners/InfoBanner";
import Container from "@/components/UI/Container";
import DefaultLayout from "@/layout/DefaultLayout";
import GalleryView from "@/views/GalleryView";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Container>
        <Homebanner />
        <InfoBanner />
        <GalleryView />
      </Container>
    </DefaultLayout>
  );
};

export default Home;
