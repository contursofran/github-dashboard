import React from "react";
import { Navbar } from "./Navbar";
import { Header, Tabs } from "./Header";
import { createStyles } from "@mantine/core";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  tabs?: Tabs[];
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
}));

function Layout({ children, currentPage, tabs }: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Navbar currentPage={currentPage} />
      <div className={classes.body}>
        <Header currentPage={currentPage} tabs={tabs} />
        {children}
      </div>
    </div>
  );
}

export { Layout };
