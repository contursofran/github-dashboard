import { SimpleGrid } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "../../store";
import { guestUser } from "../../utils/data";
import { DragDropContext } from "../../utils/dnd";
import { useStyles } from "./Board.styles";
import { BoardColumn } from "./components/BoardColumn";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import { useLists } from "./hooks/useLists";

export type BoardTabs = "features" | "tasks" | "issues";

const MAX_CARDS_PER_PAGE = 5;

function GuestBoard({ activeTab }: { activeTab: BoardTabs }) {
  const { classes } = useStyles();
  const { lists, listsHandlersArray, listsStateArray } = useLists();
  const { query } = useRouter();
  const { onDragEnd } = useDragAndDrop({ listsHandlersArray, listsStateArray });

  useEffect(() => {
    if (query.repository) {
      const activeRepository = guestUser.repositories.find(
        (repository) => repository.name === query.repository
      );

      if (activeRepository) {
        listsHandlersArray[0].setState(
          activeRepository[activeTab].cards.filter(
            (item) => item.type === "Todo"
          )
        );
        listsHandlersArray[1].setState(
          activeRepository[activeTab].cards.filter(
            (item) => item.type === "InProgress"
          )
        );
        listsHandlersArray[2].setState(
          activeRepository[activeTab].cards.filter(
            (item) => item.type === "Done"
          )
        );
      }
    }

    useStore.setState({ selectedTab: activeTab });
    useStore.setState({
      cards: listsStateArray,
      cardsHandlers: listsHandlersArray,
    });
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
              skeletons={getSkeletons()}
              title={lists[index].listName}
            />
          ))}
        </DragDropContext>
      </SimpleGrid>
    </div>
  );
}

export { GuestBoard };
