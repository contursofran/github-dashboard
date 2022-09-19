import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import { TabsLayout } from "../../../../layouts/TabsLayout";
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

const IssuesPage: NextPageWithLayout = () => {
  const { status } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <Board activeTab="issues" />
      ) : (
        <GuestBoard activeTab="issues" />
      )}
    </>
  );
};

IssuesPage.getLayout = function getLayout(page: ReactElement) {
  return <TabsLayout tabs={tabs}>{page} </TabsLayout>;
};

export default IssuesPage;
