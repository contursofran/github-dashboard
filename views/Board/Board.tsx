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

const MAX_CARDS_PER_PAGE = 5;

function Board({ activeTab }: { activeTab: BoardTabs }) {
  const { classes } = useStyles();
  const { lists, listsHandlersArray, listsStateArray, status } = useBoard({
    activeTab,
  });
  const { onDragEnd } = useDragAndDrop({ listsHandlersArray, listsStateArray });

  useEffect(() => {
    useStore.setState({ selectedTab: activeTab });
  }, [activeTab]);

  const getSkeletons = () => {
    const skeletons = [];

    for (let i = 0; i < MAX_CARDS_PER_PAGE; i++) {
      skeletons.push("skeleton");
    }

    return skeletons;
  };

  return (
    <div className={classes.content}>
      <SimpleGrid
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        className={classes.grid}
        cols={3}
        spacing={30}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((list, index) => (
            <BoardColumn
              id={index.toString()}
              itemsList={listsStateArray[index]}
              key={index}
              loading={status === "loading" ? true : false}
              skeletons={getSkeletons()}
              title={lists[index].listName}
            />
          ))}
        </DragDropContext>
      </SimpleGrid>
    </div>
  );
}

export { Board };
