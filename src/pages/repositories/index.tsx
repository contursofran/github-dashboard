import { ReactElement } from "react";
import { Tabs } from "../../layouts/Tabs";
import { Repositories } from "../../views/Repositories";
import { NextPageWithLayout } from "../_app";

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

const PublicRepositoriesPage: NextPageWithLayout = () => {
  return (
    <>
      <Repositories visibility="none" />
    </>
  );
};

PublicRepositoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <Tabs tabs={tabs}>{page}</Tabs>;
};

export default PublicRepositoriesPage;
