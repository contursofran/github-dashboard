import { ReactElement } from "react";
import { Layout } from "../../../components/layout/Layout";
import { NextPageWithLayout } from "./../../_app";

const tabs = [
  {
    link: "/repositories/public",
    label: "Public",
  },
  {
    link: "/repositories/private",
    label: "Private",
  },
];

const Home: NextPageWithLayout = () => {
  return <div>Public repos</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout currentPage="Repositories/Public" tabs={tabs}>
      {page}
    </Layout>
  );
};

export default Home;
