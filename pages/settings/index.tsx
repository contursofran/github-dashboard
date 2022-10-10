import { ReactElement } from "react";
import { Main } from "../../layouts/Main";
import { Settings } from "../../views/Settings";
import { NextPageWithLayout } from "../_app";

const SettingsPage: NextPageWithLayout = () => {
  return <Settings />;
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <Main>{page}</Main>;
};

export default SettingsPage;
