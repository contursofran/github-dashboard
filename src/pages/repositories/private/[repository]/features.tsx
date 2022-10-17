import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import { Tabs } from "../../../../layouts/Tabs";
import { Board } from "../../../../views/Board";
import { GuestBoard } from "../../../../views/Board/GuestBoard";
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
  const { status } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <Board activeTab="features" />
      ) : (
        <GuestBoard activeTab="features" />
      )}
    </>
  );
};

FeaturesPage.getLayout = function getLayout(page: ReactElement) {
  return <Tabs tabs={tabs}>{page} </Tabs>;
};

export default FeaturesPage;
