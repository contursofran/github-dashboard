import { useEffect } from "react";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";
import { ListHandlers } from "./useLists";

function useQueryBoard({
  activeTab,
  listHandlersArray,
}: {
  activeTab: "Features";
  listHandlersArray: ListHandlers;
}) {
  const selectedProject = useStore((state) => state.selectedProject);
  const { data, status } = trpc.useQuery([
    `repositories.get${activeTab}`,
    { repository: selectedProject },
  ]);

  useEffect(() => {
    if (data) {
      listHandlersArray[0].setState(
        data.filter((feature) => feature.type === "todo")
      );
      listHandlersArray[1].setState(
        data.filter((feature) => feature.type === "in-progress")
      );
      listHandlersArray[2].setState(
        data.filter((feature) => feature.type === "done")
      );
    }
  }, [data]);

  return { data, status };
}

export { useQueryBoard };
