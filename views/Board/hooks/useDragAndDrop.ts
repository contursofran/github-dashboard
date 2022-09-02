import { DropResult } from "@hello-pangea/dnd";
import { useListState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";
import { DraggableCardProps } from "../components/DraggableCard";

export interface Lists {
  items: Omit<DraggableCardProps, "index" | "id">[];
  listName: string;
}

const emptyLists: Lists[] = [
  {
    listName: "To Do",
    items: [],
  },
  {
    listName: "In Progress",
    items: [],
  },
  {
    listName: "Done",
    items: [],
  },
];

function useDragAndDrop({ activeTab }: { activeTab: "Features" }) {
  const [lists] = useState(emptyLists);
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

  const selectedProject = useStore((state) => state.selectedProject);
  const { data, status } = trpc.useQuery([
    `repositories.get${activeTab}`,
    { repository: selectedProject },
  ]);

  useEffect(() => {
    if (data) {
      toDoListStateHandler.setState(
        data.filter((feature) => feature.type === "todo")
      );
      inProgressListStateHandler.setState(
        data.filter((feature) => feature.type === "in-progress")
      );
      DoneListStateHandler.setState(
        data.filter((feature) => feature.type === "done")
      );
    }
  }, [data]);

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
    listsStateArray,
    status,
    lists,
  };
}

export { useDragAndDrop };
