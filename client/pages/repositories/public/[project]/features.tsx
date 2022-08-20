import { ReactElement } from "react";
import { TabsLayout } from "../../../../layouts/TabsLayout";
import { Board } from "../../../../views/Board";
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

const FeaturesPage: NextPageWithLayout = () => {
  return (
    <>
      <Board />
    </>
  );
};

FeaturesPage.getLayout = function getLayout(page: ReactElement) {
  return <TabsLayout tabs={tabs}>{page} </TabsLayout>;
};

export default FeaturesPage;
