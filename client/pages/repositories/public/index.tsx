import { ReactElement } from "react";
import { ProjectCard } from "../../../components/ProjectCard";
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
      <ProjectCard
        title="Github-dashboard"
        text="Dashboard to organize github projects"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        badge="Private"
      />
      <ProjectCard
        title="Github-dashboard"
        text="Dashboard to organize github projects"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        badge="Private"
      />
      <ProjectCard
        title="Github-dashboard"
        text="Dashboard to organize github projects"
        language="TypeScript"
        languageColor="blue"
        lastUpdated="Updated 7 hours ago"
        badge="Private"
      />
      <ProjectCard
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
    <RepositoriesLayout currentPage="Repositories/" tabs={tabs}>
      {page}
    </RepositoriesLayout>
  );
};

export default Home;
