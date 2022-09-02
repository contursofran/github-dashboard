import { DropResult } from "@hello-pangea/dnd";
import { ListHandlers, ListState } from "./useLists";

function useDragAndDrop({
  listHandlersArray,
  listsStateArray,
}: {
  listHandlersArray: ListHandlers;
  listsStateArray: ListState;
}) {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const destinationObject = {
      handler: listHandlersArray[parseInt(destination.droppableId)],
      list: listsStateArray[parseInt(destination.droppableId)],
    };
    const sourceObject = {
      handler: listHandlersArray[parseInt(source.droppableId)],
      list: listsStateArray[parseInt(source.droppableId)],
    };

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    } else if (destination.droppableId === source.droppableId) {
      sourceObject.handler.reorder({
        from: source.index,
        to: destination.index,
      });
    } else {
      destinationObject.handler.insert(
        destination.index,
        sourceObject.list[source.index]
      );
      sourceObject.handler.remove(source.index);
    }
  };

  return {
    onDragEnd,
  };
}

export { useDragAndDrop };
