import React from "react";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Tab } from "../../components/Tabs";
import { useStyles } from "./Main.styles";

interface Props {
  children: React.ReactNode;
  tabs?: Tab[];
}

function Main({ children, tabs }: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header tabs={tabs} />
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
}

export { Main };
