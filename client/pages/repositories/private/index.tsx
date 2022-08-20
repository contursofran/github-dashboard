import { ReactElement } from "react";
import { TabsLayout } from "../../../layouts/TabsLayout";
import { Repositories } from "../../../views/Repositories";
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

const PrivateRepositoriesPage: NextPageWithLayout = () => {
  return (
    <>
      <Repositories currentPage="Repositories/[project]/" />
    </>
  );
};

PrivateRepositoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <TabsLayout tabs={tabs}>{page}</TabsLayout>;
};

export default PrivateRepositoriesPage;
