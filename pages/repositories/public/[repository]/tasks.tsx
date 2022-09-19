import { useSession } from "next-auth/react";
import { ReactElement } from "react";
import { TabsLayout } from "../../../../layouts/TabsLayout";
import { Board } from "../../../../views/Board";
import { GuestBoard } from "../../../../views/Board/GuestBoard";
import { NextPageWithLayout } from "../../../_app";

const tabs = [
  {
    link: "/repositories/public/[repository]/features",
    label: "Features",
  },
  {
    link: "/repositories/public/[repository]/tasks",
    label: "Tasks",
  },
  {
    link: "/repositories/public/[repository]/issues",
    label: "Issues",
  },
];

const TasksPage: NextPageWithLayout = () => {
  const { status } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <Board activeTab="tasks" />
      ) : (
        <GuestBoard activeTab="tasks" />
      )}
    </>
  );
};

TasksPage.getLayout = function getLayout(page: ReactElement) {
  return <TabsLayout tabs={tabs}>{page} </TabsLayout>;
};

export default TasksPage;
