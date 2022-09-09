import { useEffect } from "react";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";
import { BoardTabs } from "../Board";
import { ListHandlers } from "./useLists";

interface Props {
  activeTab: BoardTabs;
  listHandlersArray: ListHandlers;
}

function useBoard({ activeTab, listHandlersArray }: Props) {
  const selectedRepository = useStore((state) => state.selectedRepository);
  const selectedRepositoryId = useStore((state) => state.selectedRepositoryId);
  const utils = trpc.useContext();
  const createRepositoryMutation = trpc.useMutation(["repository.create"], {
    onSuccess: () => {
      utils.invalidateQueries(["repository.get", { name: selectedRepository }]);
    },
  });

  const { data: repositories, status: repositoriesStatus } = trpc.useQuery([
    `repository.get`,
    { name: selectedRepository },
  ]);

  useEffect(() => {
    if (repositoriesStatus === "success") {
      if (!repositories?.repository?.id) {
        createRepositoryMutation.mutate({
          name: selectedRepository,
        });
      } else {
        useStore.setState({
          selectedRepositoryId: repositories.repository.id,
        });
      }
    }
  }, [repositories]);

  const { data, status } = trpc.useQuery([
    `${activeTab}.get`,
    { repositoryId: selectedRepositoryId },
  ]);

  useEffect(() => {
    if (data && status === "success") {
      listHandlersArray[0].setState(
        data.filter((item) => item.type === "Todo")
      );
      listHandlersArray[1].setState(
        data.filter((item) => item.type === "InProgress")
      );
      listHandlersArray[2].setState(
        data.filter((item) => item.type === "Done")
      );

      listHandlersArray.forEach((list) => {
        list.setState((prev) => {
          return prev.sort((a, b) => a.index - b.index);
        });
      });
    }
  }, [data]);

  return { data, status };
}

export { useBoard };
