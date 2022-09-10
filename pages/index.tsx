import { useEffect } from "react";
import axios from "axios";

import Homebanner from "@/components/banners/Homebanner";
import InfoBanner from "@/components/banners/InfoBanner";
import Container from "@/components/UI/Container";
import DefaultLayout from "@/layout/DefaultLayout";
import CategoryGalleryView from "@/views/CategoryGalleryView";
import CategoryList from "@/views/CategoryList";

import type { NextPage } from "next";

const Home: NextPage = () => {
  useEffect(() => {
    async function createWallet() {
      return await axios
        .post("/api/admin/e-wallet", {})
        .then((response) => console.log("data-response", response))
        .catch((error) => console.log("error", error));
    }
    createWallet();
  }, []);

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
