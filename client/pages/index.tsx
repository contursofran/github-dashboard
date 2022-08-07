import { ReactElement } from "react";
import { Layout } from "../components/layout/Layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return <div>Home</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout currentPage="Home">{page}</Layout>;
};

export default Home;
