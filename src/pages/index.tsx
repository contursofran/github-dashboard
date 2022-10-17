import { ReactElement } from "react";
import { Main } from "../layouts/Main";
import { Overview } from "../views/Overview";
import { NextPageWithLayout } from "./_app";

const OverviewPage: NextPageWithLayout = () => {
  return <Overview />;
};

OverviewPage.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};

export default OverviewPage;
