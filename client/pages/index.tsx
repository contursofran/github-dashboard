import { ReactElement } from "react";
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return <>Home</>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout currentPage="Home">{page}</MainLayout>;
};

export default Home;
