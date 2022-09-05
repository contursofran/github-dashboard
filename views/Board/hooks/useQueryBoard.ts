import { useEffect } from "react";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";
import { BoardTabs } from "../Board";
import { ListHandlers } from "./useLists";

interface Props {
  activeTab: BoardTabs;
  listHandlersArray: ListHandlers;
}

function useQueryBoard({ activeTab, listHandlersArray }: Props) {
  const selectedProject = useStore((state) => state.selectedProject);
  const { data, status } = trpc.useQuery([
    `${activeTab}.get`,
    { repository: selectedProject },
  ]);

  useEffect(() => {
    if (data) {
      listHandlersArray[0].setState(
        data.filter((item) => item.type === "Todo")
      );
      listHandlersArray[1].setState(
        data.filter((item) => item.type === "InProgress")
      );
      listHandlersArray[2].setState(
        data.filter((item) => item.type === "Done")
      );
    }
  }, [data]);

  return { data, status };
}

export { useQueryBoard };
