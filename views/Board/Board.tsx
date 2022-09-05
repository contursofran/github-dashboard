import { SimpleGrid } from "@mantine/core";
import { useEffect } from "react";
import { useStore } from "../../store";
import { DragDropContext } from "../../utils/dnd";
import { useStyles } from "./Board.styles";
import { BoardColumn } from "./components/BoardColumn";
import { useBoard } from "./hooks/useBoard";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useLists } from "./hooks/useLists";

export type BoardTabs = "features" | "tasks" | "issues";

function Board({ activeTab }: { activeTab: BoardTabs }) {
  const { classes } = useStyles();
  const { listHandlersArray, lists, listsStateArray } = useLists();
  const { onDragEnd } = useDragAndDrop({ listHandlersArray, listsStateArray });
  const { status } = useBoard({ activeTab, listHandlersArray });

  useEffect(() => {
    useStore.setState({ selectedTab: activeTab });
  }, [activeTab]);

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
