import React from "react";
import { Navbar } from "./Navbar";
import { createStyles, Group } from "@mantine/core";
import { Header } from "./Header";

export interface Tabs {
  link: string;
  label: string;
}

interface Props {
  children: React.ReactNode;
  tabs: Tabs[];
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

function Layout({ children, tabs }: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header tabs={tabs} />
        {children}
      </div>
    </div>
  );
}

export { Layout };
