import { ReactElement } from "react";
import { Main } from "../layouts/Main";
import { Home } from "../views/Home";
import { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  return <Home />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};

export default HomePage;
