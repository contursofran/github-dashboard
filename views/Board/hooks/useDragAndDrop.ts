import { DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";
import { useLists } from "./useLists";

function useDragAndDrop() {
  const selectedRepositoryId = useStore((state) => state.selectedRepositoryId);
  const { listHandlersArray, lists, listsStateArray } = useLists();
  const [changeIndexList, setChangeIndexList] = useState(false);
  const [changeTypeIndexList, setChangeTypeIndexList] = useState(false);
  const utils = trpc.useContext();
  const queryClient = useQueryClient();

  const updateIndexCard = trpc.useMutation(["features.updateIndex"], {
    onMutate: async () => {
      queryClient.cancelQueries([
        "features.get",
        { repositoryId: selectedRepositoryId },
      ]);
    },
    onSuccess: () => {
      utils.invalidateQueries([
        "features.get",
        { repositoryId: selectedRepositoryId },
      ]);
    },
  });

  useEffect(() => {
    if (changeIndexList) {
      const list = listsStateArray[0];

      const cards = list.map((item) => {
        return {
          id: item.id,
          index: list.indexOf(item),
        };
      });

      cards.forEach((card) => {
        updateIndexCard.mutate({
          id: card.id,
          index: card.index,
        });
      });

      setChangeIndexList(false);
    }
  }, [lists, changeIndexList, listsStateArray, updateIndexCard]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    } else if (destination.droppableId === source.droppableId) {
      listHandlersArray[parseInt(source.droppableId)].reorder({
        from: source.index,
        to: destination.index,
      });
      setChangeIndexList(true);
      // TODO: THis is not working, the index dosent change when console loggin.

      // updateCardsIndex(sourceObject);
      // } else {
      //   destinationObject.handler.insert(
      //     destination.index,
      //     sourceObject.list[source.index]
      //   );
      //   sourceObject.handler.remove(source.index);
      // }
    }
  };

  return {
    onDragEnd,
    lists,
    listHandlersArray,
    listsStateArray,
  };
}

export { useDragAndDrop };
