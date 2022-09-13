import { DropResult } from "@hello-pangea/dnd";
import { useEffect } from "react";
import { ListHandlers, ListState } from "./useLists";
import { useMoveCard } from "./useMoveCard";

interface Props {
  listsHandlersArray: ListHandlers;
  listsStateArray: ListState;
}

function useDragAndDrop({ listsHandlersArray, listsStateArray }: Props) {
  const card = useMoveCard({ listsStateArray });

  useEffect(() => {
    if (card.shouldUpdateCardIndex) {
      card.updateCardIndex();
    } else if (card.shouldUpdateCardType) {
      card.updateCardType();
    }
  }, [card]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    card.setSourceListIndex(source.droppableId);
    card.setDestinationListIndex(destination.droppableId);

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
      card.setShouldUpdateCardIndex(true);
    } else {
      listsHandlersArray[parseInt(destination.droppableId)].insert(
        destination.index,
        listsStateArray[parseInt(source.droppableId)][source.index]
      );

      card.updateTypeMutation.mutate({
        id: listsStateArray[parseInt(source.droppableId)][source.index].id,
        type: getType(),
      });
      listsHandlersArray[parseInt(source.droppableId)].remove(source.index);
      card.setShouldUpdateCardType(true);
    }
  };

  return {
    onDragEnd,
    listsHandlersArray,
    listsStateArray,
  };
}

export { useDragAndDrop };
