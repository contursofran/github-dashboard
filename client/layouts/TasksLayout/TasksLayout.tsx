import { SimpleGrid } from "@mantine/core";
import { DragDropGrid } from "../../components/DragDropGrid";
import { Header, Tab } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { Lists } from "../../types/base";
import { DragDropContext } from "../../utils/dnd";
import { useStyles } from "./TasksLayout.styles";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  currentTab: string;
  tabs?: Tab[];
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
  const { listsStateArray, onDragEnd } = useDragAndDrop(lists);

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
                  id={index.toString()}
                  itemsList={listsStateArray[index]}
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
