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
    <>
      <Card
        title="Github-dashboard"
        text="Dashboard to organize github projects"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        badge="Private"
      />
      <Card
        title="Github-dashboard"
        text="Dashboard to organize github projects"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        badge="Private"
      />
      <Card
        title="Github-dashboard"
        text="Dashboard to organize github projects"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        badge="Private"
      />
      <Card
        title="Github-dashboard"
        text="Dashboard to organize github"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        badge="Private"
      />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout currentPage="Repositories/" tabs={tabs}>
      {page}
    </Layout>
  );
};

export default Home;
