import { ReactElement } from "react";
import { Layout } from "../components/layout/Layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return <div></div>;
};

const tabs = [
  {
    link: "/",
    label: "Public",
  },
  {
    link: "/private",
    label: "Private",
  },
];

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout tabs={tabs}>{page}</Layout>;
};

export default Home;
