import { ReactElement } from "react";
import { Card } from "../../../components/Card";
import { RepositoriesLayout } from "../../../layouts/RepositoriesLayout";
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
        badge="Private"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        text="Dashboard to organize github projects"
        title="Github-dashboard"
      />
      <Card
        badge="Private"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        text="Dashboard to organize github projects"
        title="Github-dashboard"
      />
      <Card
        badge="Private"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        text="Dashboard to organize github projects"
        title="Github-dashboard"
      />
      <Card
        badge="Private"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        text="Dashboard to organize github"
        title="Github-dashboard"
      />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <RepositoriesLayout currentPage="Repositories/" tabs={tabs}>
      {page}
    </RepositoriesLayout>
  );
};

export default Home;
