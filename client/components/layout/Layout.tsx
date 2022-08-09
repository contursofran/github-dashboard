import React from "react";
import { Navbar } from "./Navbar";
import { Header, Tab } from "./Header";
import { createStyles, SimpleGrid } from "@mantine/core";

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

function Layout({ children, currentPage, tabs }: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header currentPage={currentPage} tabs={tabs} />
        <div className={classes.content}>
          <SimpleGrid
            breakpoints={[
              { minWidth: 1700, cols: 3, spacing: 40 },
              { minWidth: 1200, cols: 2, spacing: 40 },
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

export { Layout };
