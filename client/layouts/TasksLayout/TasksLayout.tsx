import { SimpleGrid } from "@mantine/core";
import { Header, Tab } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Board } from "../../features/board/components/Board";
import { useStyles } from "./TasksLayout.styles";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  currentTab: string;
  tabs?: Tab[];
}

function TasksLayout({ currentPage, tabs }: Props) {
  const { classes } = useStyles();

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
            <Board />
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export { TasksLayout };
