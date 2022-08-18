import { useListState } from "@mantine/hooks";
import { Lists } from "../types";

function useDragAndDrop(lists: Lists[]) {
  const [toDoListState, toDoListStateHandler] = useListState(lists[0].items);
  const [inProgressListState, inProgressListStateHandler] = useListState(
    lists[1].items
  );
  const [DoneListState, DoneListStateHandler] = useListState(lists[2].items);

  const listsStateArray = [toDoListState, inProgressListState, DoneListState];
  const listHandlersArray = [
    toDoListStateHandler,
    inProgressListStateHandler,
    DoneListStateHandler,
  ];

  const onDragEnd = (result: any) => {
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
    listsStateArray,
  };
}

export { useDragAndDrop };
