import { ReactElement } from "react";
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { Home as HomeComponent } from "../views/Home";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return <HomeComponent />;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout currentPage="Home">{page}</MainLayout>;
};

export default Home;
