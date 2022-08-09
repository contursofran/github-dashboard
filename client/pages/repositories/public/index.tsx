import { ReactElement } from "react";
import { Card } from "../../../components/Card";
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
  return (
    <div>
      <Card
        title="Github-dashboard"
        text="Dashboard to organize github projects"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        badge="Private"
      />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout currentPage="Repositories/Public" tabs={tabs}>
      {page}
    </Layout>
  );
};

export default Home;
