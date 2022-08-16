import { SimpleGrid } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import React, { useEffect } from "react";
import { DragDropGrid } from "../../components/DragDropGrid";
import {
  DraggableCard,
  DraggableCardProps,
} from "../../components/DraggableCard";
import { Header, Tab } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { useStore } from "../../store";
import { Draggable } from "../../utils/dnd";
import { useStyles } from "./TasksLayout.styles";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  currentTab: string;
  tabs?: Tab[];
}

const list: Omit<DraggableCardProps, "index">[] = [
  {
    tags: ["tag1", "tag2"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    title: "Title 1",
  },
  {
    tags: ["tag1", "tag2"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    title: "Title 2",
  },
];

function TasksLayout({ children, currentPage, currentTab, tabs }: Props) {
  const { classes, cx } = useStyles();
  const [state, listHandler] = useListState(list);

  useEffect(() => {
    if (!currentPage.includes("[project]")) {
      useStore.setState({ selectedProject: "" });
    }
  }, [currentPage]);

  const items = state.map((item, index) => (
    <Draggable
      draggableId={index.toString()}
      index={index}
      key={index.toString()}
    >
      {(provided, snapshot) => (
        <div
          className={cx(classes.card, {
            [classes.cardDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <DraggableCard tags={item.tags} text={item.text} title={item.title} />
        </div>
      )}
    </Draggable>
  ));

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
            spacing={40}
          >
            <DragDropGrid counter={2} listHandler={listHandler} title="To Do">
              {items}
            </DragDropGrid>
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export { TasksLayout };
