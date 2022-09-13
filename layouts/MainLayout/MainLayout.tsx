import { SimpleGrid } from "@mantine/core";
import React, { useEffect } from "react";
import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";
import { Tab } from "../../components/Tabs";
import { useStore } from "../../store";
import { useStyles } from "./MainLayout.styles";

interface Props {
  children: React.ReactNode;
  currentPage: string;
  tabs?: Tab[];
}

function MainLayout({ children, currentPage, tabs }: Props) {
  const { classes } = useStyles();

  useEffect(() => {
    useStore.setState({ selectedRepository: "" });
  }, []);

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.body}>
        <Header currentPage={currentPage} tabs={tabs} />
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
