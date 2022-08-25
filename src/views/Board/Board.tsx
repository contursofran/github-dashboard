import { SimpleGrid } from "@mantine/core";
import { DragDropContext } from "../../utils/dnd";
import { useStyles } from "./Board.styles";
import { BoardColumn } from "./components/BoardColumn";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { Lists } from "./types";

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
        tag: "HIGH",
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
  const { classes } = useStyles();

  return (
    <div className={classes.content}>
      <SimpleGrid
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        className={classes.grid}
        cols={3}
        spacing={30}
      >
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
      </SimpleGrid>
    </div>
  );
}

export { Board };
