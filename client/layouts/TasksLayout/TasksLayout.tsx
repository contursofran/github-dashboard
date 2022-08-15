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
            <Card p="lg" radius="md" withBorder className={classes.gridItem}>
              <Group spacing="xs" mb="xs">
                <Title order={4}>To Do</Title>
                <ColorSwatch color={colors.gray[7]}>2</ColorSwatch>
              </Group>
            </Card>
            <Card p="lg" radius="md" withBorder className={classes.gridItem}>
              <Group mb="xs">
                <Title order={4}>On progress</Title>
              </Group>
            </Card>
            <Card p="lg" radius="md" withBorder className={classes.gridItem}>
              <Group mb="xs">
                <Title order={4}>Done</Title>
              </Group>
            </Card>
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export { TasksLayout };
