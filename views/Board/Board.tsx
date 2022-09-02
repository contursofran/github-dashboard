import { SimpleGrid } from "@mantine/core";
import { DragDropContext } from "../../utils/dnd";
import { useStyles } from "./Board.styles";
import { BoardColumn } from "./components/BoardColumn";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useLists } from "./hooks/useLists";
import { useQueryBoard } from "./hooks/useQueryBoard";

function Board({ activeTab }: { activeTab: "Features" }) {
  const { classes } = useStyles();
  const { listHandlersArray, lists, listsStateArray } = useLists();
  const { onDragEnd } = useDragAndDrop({ listHandlersArray, listsStateArray });
  const { status } = useQueryBoard({ activeTab, listHandlersArray });

  if (status === "loading") {
    return <div>Loading...</div>;
  }
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
