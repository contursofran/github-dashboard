import { useListState } from "@mantine/hooks";
import { useState } from "react";
import { Lists } from "../types";

export type ListHandlers = ReturnType<typeof useLists>["listsHandlersArray"];
export type ListState = ReturnType<typeof useLists>["listsStateArray"];

const emptyLists: Lists[] = [
  {
    listName: "Todo",
    items: [],
  },
  {
    listName: "InProgress",
    items: [],
  },
  {
    listName: "Done",
    items: [],
  },
];

function useLists() {
  const [lists] = useState(emptyLists);
  const [toDoListState, toDoListStateHandler] = useListState(lists[0].items);
  const [inProgressListState, inProgressListStateHandler] = useListState(
    lists[1].items
  );
  const [doneListState, doneListStateHandler] = useListState(lists[2].items);

  const listsStateArray = [toDoListState, inProgressListState, doneListState];
  const listsHandlersArray = [
    toDoListStateHandler,
    inProgressListStateHandler,
    doneListStateHandler,
  ];

  return {
    listsStateArray,
    listsHandlersArray,
    lists,
  };
}

export { useLists };
