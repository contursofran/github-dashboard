import React, { useEffect } from "react";
import { Navbar } from "../../Navbar";
import { Header, Tab } from "../../Header";
import { createStyles, SimpleGrid } from "@mantine/core";
import { useStore } from "../../../store";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  tabs?: Tab[];
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
    alignSelf: "stretch",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function MainLayout({ children, currentPage, tabs }: Props) {
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
            breakpoints={[
              { minWidth: 1780, cols: 3, spacing: 40 },
              { minWidth: 1210, cols: 2, spacing: 40 },
              { minWidth: 0, cols: 1, spacing: 30 },
            ]}
            cols={3}
          >
            {children}
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export { MainLayout };
