import { ReactElement } from "react";
import { TasksLayout } from "../../../../layouts/TasksLayout/TasksLayout";
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
  return <>asd</>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <TasksLayout
      currentPage="Repositories/Public/[project]/features"
      currentTab="features"
      tabs={tabs}
    >
      {page}{" "}
    </TasksLayout>
  );
};

export default Home;
