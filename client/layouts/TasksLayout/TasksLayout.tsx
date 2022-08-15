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
import { GridCard } from "../../components/GridCard";
import { Header, Tab } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
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
  const { colors } = useMantineTheme();

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
            <GridCard title="To Do" counter={2} />
            <GridCard title="On progress" counter={2} />
            <GridCard title="Done" counter={5} />
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export { TasksLayout };
