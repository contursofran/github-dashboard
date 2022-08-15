import { SimpleGrid } from "@mantine/core";
import React, { useEffect } from "react";
import { Header, Tab } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { useStore } from "../../store";
import { useStyles } from "./RepositoriesLayout.styles";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  tabs?: Tab[];
}

function RepositoriesLayout({ children, currentPage, tabs }: Props) {
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
            className={classes.grid}
          >
            {children}
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
}

export { RepositoriesLayout };
