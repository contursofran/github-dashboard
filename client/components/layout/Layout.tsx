import React from "react";
import { Navbar } from "./Navbar";
import { Header, Tab } from "./Header";
import { createStyles } from "@mantine/core";

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
    flexGrow: 1,
    padding: theme.spacing.xl,
  },
}));

function Layout({ children, currentPage, tabs }: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header currentPage={currentPage} tabs={tabs} />
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
}

export { Layout };
