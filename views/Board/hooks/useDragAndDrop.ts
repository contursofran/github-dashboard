import { DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";
import { useLists } from "./useLists";
import { useTrackParallelMutations } from "./useTrackParallelMutations";

function useDragAndDrop() {
  const [updateCardType, setUpdateCardType] = useState(false);
  const [updateCardIndex, setUpdateCardIndex] = useState(false);
  const selectedRepositoryId = useStore((state) => state.selectedRepositoryId);
  const { listHandlersArray, lists, listsStateArray } = useLists();

  const mutationTracker = useTrackParallelMutations();
  const utils = trpc.useContext();
  const queryClient = useQueryClient();

  const updateIndexMutation = trpc.useMutation(["features.updateIndex"], {
    onMutate: async () => mutationTracker.startOne(),
    onSettled: () => {
      mutationTracker.endOne();
      if (mutationTracker.allEnded()) {
        utils.invalidateQueries([
          "features.get",
          { repositoryId: selectedRepositoryId },
        ]);
      }
    },
  });

  const updateTypeMutation = trpc.useMutation(["features.updateType"], {
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
    if (updateCardIndex) {
      const list = listsStateArray[0];

      const cards = list.map((item) => {
        return {
          id: item.id,
          index: list.indexOf(item),
        };
      });

      cards.forEach((card) => {
        updateIndexMutation.mutate({
          id: card.id,
          index: card.index,
        });
      });

      setUpdateCardIndex(false);
    } else if (updateCardType) {
      const list = listsStateArray[0];
      const detinationList = listsStateArray[1];

      const cards = list.map((item) => {
        return {
          id: item.id,
          index: list.indexOf(item),
        };
      });

      const detinationCards = detinationList.map((item) => {
        return {
          id: item.id,
          index: detinationList.indexOf(item),
        };
      });

      cards.forEach((card) => {
        updateIndexMutation.mutate({
          id: card.id,
          index: card.index,
        });
      });
      detinationCards.forEach((card) => {
        updateIndexMutation.mutate({
          id: card.id,
          index: card.index,
        });
      });
      setUpdateCardType(false);
    }
  }, [lists, setUpdateCardIndex, listsStateArray, updateIndexMutation]);

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
      setUpdateCardIndex(true);
    } else {
      listHandlersArray[parseInt(destination.droppableId)].insert(
        destination.index,
        listsStateArray[parseInt(source.droppableId)][source.index]
      );
      listHandlersArray[parseInt(source.droppableId)].remove(source.index);
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
