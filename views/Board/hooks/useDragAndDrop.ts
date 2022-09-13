import { DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";
import { ListHandlers, ListState } from "./useLists";
import { useTrackParallelMutations } from "./useTrackParallelMutations";

interface Props {
  listsHandlersArray: ListHandlers;
  listsStateArray: ListState;
}

function useDragAndDrop({ listsHandlersArray, listsStateArray }: Props) {
  const [updateCardType, setUpdateCardType] = useState(false);
  const [updateCardIndex, setUpdateCardIndex] = useState(false);
  const [sourceListIndex, setSourceListIndex] = useState("0");
  const [destinationListIndex, setDestinationListIndex] = useState("0");
  const selectedRepositoryId = useStore((state) => state.selectedRepositoryId);

  const mutationTracker = useTrackParallelMutations();
  const utils = trpc.useContext();

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

  useEffect(() => {
    if (updateCardIndex) {
      const sourceList = listsStateArray[Number(sourceListIndex)];
      console.log(sourceList);

      const cards = sourceList.map((item) => {
        return {
          id: item.id,
          index: sourceList.indexOf(item),
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
      const sourceList = listsStateArray[Number(sourceListIndex)];
      const destinationList = listsStateArray[Number(destinationListIndex)];

      const cards = sourceList.map((item) => {
        return {
          id: item.id,
          index: sourceList.indexOf(item),
        };
      });

      const detinationCards = destinationList.map((item) => {
        return {
          id: item.id,
          index: destinationList.indexOf(item),
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
  }, [
    updateCardIndex,
    updateCardType,
    listsStateArray,
    updateIndexMutation,
    sourceListIndex,
    destinationListIndex,
  ]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    setSourceListIndex(source.droppableId);
    setDestinationListIndex(destination.droppableId);

    const getType = () => {
      if (destination.droppableId === "0") {
        return "Todo";
      } else if (destination.droppableId === "1") {
        return "InProgress";
      } else if (destination.droppableId === "2") {
        return "Done";
      } else {
        return "Todo";
      }
    };

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    } else if (destination.droppableId === source.droppableId) {
      listsHandlersArray[parseInt(source.droppableId)].reorder({
        from: source.index,
        to: destination.index,
      });
      setUpdateCardIndex(true);
    } else {
      listsHandlersArray[parseInt(destination.droppableId)].insert(
        destination.index,
        listsStateArray[parseInt(source.droppableId)][source.index]
      );

      updateTypeMutation.mutate({
        id: listsStateArray[parseInt(source.droppableId)][source.index].id,
        type: getType(),
      });
      listsHandlersArray[parseInt(source.droppableId)].remove(source.index);
      setUpdateCardType(true);
    }
  };

  return {
    onDragEnd,
    listsHandlersArray,
    listsStateArray,
  };
}

export { useDragAndDrop };
