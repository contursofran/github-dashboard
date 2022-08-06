import React from "react";
import { Navbar } from "./Navbar";
import { createStyles, Group } from "@mantine/core";
import { Header } from "./Header";

const useStyles = createStyles((theme) => ({
  root: {
    color: "white",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "start",
    alignSelf: "stretch",
    marginRight: theme.spacing.md,
  },
}));

function Layout({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();

  return (
    <div>
      <Group align="start">
        <Navbar />
        <div className={classes.content}>
          <Header />
          <Group className={classes.content}>{children}</Group>
        </div>
      </Group>
    </div>
  );
}

export { Layout };
