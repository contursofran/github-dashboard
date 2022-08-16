import {
  Card,
  CardSection,
  ColorSwatch,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect } from "react";
import { Grid } from "../../components/Grid";
import { Header, Tab } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { TaskCard } from "../../components/TaskCard";
import { useStore } from "../../store";
import { useStyles } from "./TasksLayoutStyles";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  tabs?: Tab[];
  currentTab: string;
}

function TasksLayout({ children, currentPage, tabs, currentTab }: Props) {
  const { classes } = useStyles();

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
            spacing={40}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <Grid title="To Do" counter={2}>
              <TaskCard
                title="Task 1"
                text="Finish the task 1"
                tags={["tag1", "tag2"]}
              />
              <TaskCard
                title="Task 1"
                text="Finish the task 1"
                tags={["tag1", "tag2"]}
              />
              <TaskCard
                title="Task 1"
                text="Finish the task 1"
                tags={["tag1", "tag2"]}
              />
            </Grid>
            <Grid title="On progress" counter={2}>
              <TaskCard
                title="Task 1"
                text="Finish the task 1"
                tags={["tag1", "tag2"]}
              />
            </Grid>
            <Grid title="Done" counter={5}>
              <TaskCard
                title="Task 1"
                text="Finish the task 1"
                tags={["tag1", "tag2"]}
              />
            </Grid>
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export { TasksLayout };
