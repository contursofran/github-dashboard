import { ReactElement } from "react";
import { TabsLayout } from "../../../../layouts/TabsLayout";
import { Board } from "../../../../views/Board";
import { NextPageWithLayout } from "../../../_app";

const tabs = [
  {
    link: "/repositories/private/[repository]/features",
    label: "Features",
  },
  {
    link: "/repositories/private/[repository]/tasks",
    label: "Tasks",
  },
  {
    link: "/repositories/private/[repository]/issues",
    label: "Issues",
  },
];

const FeaturesPage: NextPageWithLayout = () => {
  return (
    <>
      <Board activeTab="features" />
    </>
  );
};

FeaturesPage.getLayout = function getLayout(page: ReactElement) {
  return <TabsLayout tabs={tabs}>{page} </TabsLayout>;
};

export default FeaturesPage;
