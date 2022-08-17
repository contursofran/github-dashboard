import { DropResult } from "@hello-pangea/dnd";
import { SimpleGrid } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import React, { useEffect } from "react";
import { DragDropGrid } from "../../components/DragDropGrid";
import { DraggableCardProps } from "../../components/DragDropGrid/DraggableCard";
import { Header, Tab } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { useStore } from "../../store";
import { DragDropContext } from "../../utils/dnd";
import { useStyles } from "./TasksLayout.styles";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  currentTab: string;
  tabs?: Tab[];
}

interface Lists {
  items: DraggableCardProps[];
  listName: string;
}

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

function TasksLayout({ currentPage, tabs }: Props) {
  const { classes } = useStyles();
  const [toDoListState, toDoListStateHandler] = useListState(lists[0].items);
  const [inProgressListState, inProgressListStateHandler] = useListState(
    lists[1].items
  );
  const [DoneListState, DoneListStateHandler] = useListState(lists[2].items);

  useEffect(() => {
    if (!currentPage.includes("[project]")) {
      useStore.setState({ selectedProject: "" });
    }
  }, [currentPage]);

  const listsArray = [toDoListState, inProgressListState, DoneListState];
  const listHandlers = [
    toDoListStateHandler,
    inProgressListStateHandler,
    DoneListStateHandler,
  ];

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    const destinationObject = {
      handler: listHandlers[parseInt(destination.droppableId)],
      list: listsArray[parseInt(destination.droppableId)],
    };
    const sourceObject = {
      handler: listHandlers[parseInt(source.droppableId)],
      list: listsArray[parseInt(source.droppableId)],
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

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header currentPage={currentPage} tabs={tabs} />
        <div className={classes.content}>
          <SimpleGrid
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            className={classes.grid}
            cols={3}
            spacing={30}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              {lists.map((grid, index) => (
                <DragDropGrid
                  counter={2}
                  id={index.toString()}
                  itemsList={listsArray[index]}
                  key={index}
                  title={lists[index].listName}
                />
              ))}
            </DragDropContext>
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export { TasksLayout };
