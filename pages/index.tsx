import Homebanner from "@/components/banners/Homebanner";
import InfoBanner from "@/components/banners/InfoBanner";
import Container from "@/components/UI/Container";
import DefaultLayout from "@/layout/DefaultLayout";
import CategoryGalleryView from "@/viewsd/CategoryGalleryView";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Container>
        <Homebanner />
        <InfoBanner />
        <CategoryGalleryView />
      </Container>
    </DefaultLayout>
  );
};

export default Home;
