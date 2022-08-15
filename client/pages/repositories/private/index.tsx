import { ReactElement } from "react";
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
  return <div>Private repos</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <RepositoriesLayout currentPage="Repositories/Private" tabs={tabs}>
      {page}
    </RepositoriesLayout>
  );
};

export default Home;
