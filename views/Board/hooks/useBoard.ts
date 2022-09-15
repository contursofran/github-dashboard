import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";
import { BoardTabs } from "../Board";
import { useLists } from "./useLists";

interface Props {
  activeTab: BoardTabs;
}

function useBoard({ activeTab }: Props) {
  const { query } = useRouter();
  const selectedRepositoryId = useStore((state) => state.selectedRepositoryId);
  const { lists, listsHandlersArray, listsStateArray } = useLists();

  const utils = trpc.useContext();
  const createRepositoryMutation = trpc.useMutation(["repository.create"], {
    onSuccess: () => {
      utils.invalidateQueries([
        "repository.get",
        { name: query.repository as string },
      ]);
    },
  });

  const { data: repositories, status: repositoriesStatus } = trpc.useQuery([
    `repository.get`,
    { name: query.repository as string },
  ]);

  useEffect(() => {
    if (repositoriesStatus === "success") {
      if (!repositories?.repository?.id) {
        createRepositoryMutation.mutate({
          name: query.repository as string,
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
      listsHandlersArray[0].setState(
        data.filter((item) => item.type === "Todo")
      );
      listsHandlersArray[1].setState(
        data.filter((item) => item.type === "InProgress")
      );
      listsHandlersArray[2].setState(
        data.filter((item) => item.type === "Done")
      );

      listsHandlersArray.map((list, index) => {
        listsHandlersArray[index].setState((state) => {
          return state.sort((a, b) => a.index - b.index);
        });
      });
    }
  }, [data]);

  return { data, lists, status, listsStateArray, listsHandlersArray };
}

export { useBoard };
