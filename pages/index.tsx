import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Homebanner from "@/components/banners/Homebanner";
import InfoBanner from "@/components/banners/InfoBanner";
import Container from "@/components/UI/Container";
import DefaultLayout from "@/layout/DefaultLayout";
import CategoryGalleryView from "@/views/CategoryGalleryView";
import CategoryList from "@/views/CategoryList";

import type { NextPage } from "next";

function createWallet() {
  return axios.post("/api/admin/e-wallte", {});
}

function getWallet() {
  return axios.get("/api/admin/e-wallet");
}

const Home: NextPage = () => {
  const { data } = useQuery(["getWallet"], getWallet);

  console.log("data-getWallet", data);

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
