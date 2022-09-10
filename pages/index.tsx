import Homebanner from "@/components/banners/Homebanner";
import InfoBanner from "@/components/banners/InfoBanner";
import Container from "@/components/UI/Container";
import DefaultLayout from "@/layout/DefaultLayout";
import CategoryGalleryView from "@/views/CategoryGalleryView";
import CategoryList from "@/views/CategoryList";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Container className="flex-col">
        <Homebanner />
        <InfoBanner />
        <CategoryGalleryView />
        <CategoryList />
      </Container>
    </DefaultLayout>
  );
};

export default Home;
