import { DragDropContext } from "../../../../utils/dnd";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { Lists } from "../../types";
import { BoardColumn } from "../BoardColumn";

const lists: Lists[] = [
  {
    listName: "To Do",
    items: [
      {
        tag: "Important",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        title: "Title 1",
      },
      {
        tag: "tag2",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        title: "Title 2",
      },
    ],
  },
  {
    listName: "In Progress",
    items: [
      {
        tag: "Testing",
        text: "Lorem ",
        title: "Working",
      },
    ],
  },
  {
    listName: "Done",
    items: [
      {
        tag: "Done",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        title: "Title 3",
      },
    ],
  },
];

function Board() {
  const { listsStateArray, onDragEnd } = useDragAndDrop(lists);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {lists.map((grid, index) => (
        <BoardColumn
          id={index.toString()}
          itemsList={listsStateArray[index]}
          key={index}
          title={lists[index].listName}
        />
      ))}
    </DragDropContext>
  );
}

export { Board };
