import { ReactElement } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../views/Home";
import { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  return <Home />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout currentPage="Home">{page}</MainLayout>;
};

export default HomePage;
