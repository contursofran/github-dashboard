import { ReactElement } from "react";
import { Layout } from "../../../../components/layout/Layout";
import { NextPageWithLayout } from "../../../_app";

const tabs = [
  {
    link: "/repositories/public/[project]/features",
    label: "Features",
  },
  {
    link: "/repositories/public/[project]/tasks",
    label: "Tasks",
  },
  {
    link: "/repositories/public/[project]/issues",
    label: "Issues",
  },
];

const Home: NextPageWithLayout = () => {
  return <>issues</>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout currentPage="Repositories/Public/[project]/issues" tabs={tabs}>
      {page}{" "}
    </Layout>
  );
};

export default Home;
