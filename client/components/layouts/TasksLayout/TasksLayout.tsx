import React, { useEffect } from "react";
import { Navbar } from "../../Navbar";
import { Header, Tab } from "../../Header";
import {
  Card,
  Container,
  createStyles,
  Grid,
  Group,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";
import { useStore } from "../../../store";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  tabs?: Tab[];
  currentTab: string;
}

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "start",
    alignSelf: "stretch",
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.dark[7],
  },
  content: {
    flex: 1,
    alignSelf: "stretch",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  grid: {
    height: "100%",
    width: "100%",
  },

  gridItem: {
    backgroundColor: theme.colors.dark[8],
  },
}));

function TasksLayout({ children, currentPage, tabs, currentTab }: Props) {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  useEffect(() => {
    if (!currentPage.includes("[project]")) {
      useStore.setState({ selectedProject: "" });
    }
  }, [currentPage]);

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header tabs={tabs} currentPage={currentPage} />
        <div className={classes.content}>
          <SimpleGrid
            cols={3}
            className={classes.grid}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <Card>asd</Card>
            <div className={classes.gridItem} />
            <div className={classes.gridItem} />
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export { TasksLayout };
