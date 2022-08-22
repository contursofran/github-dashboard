import { SimpleGrid } from "@mantine/core";
import { useEffect } from "react";
import { useStore } from "../../store";
import { Card } from "./components/Card";
import { useStyles } from "./Repositories.styles";

interface Props {
  currentPage: string;
}

function Repositories({ currentPage }: Props) {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.content}>
        <SimpleGrid
          breakpoints={[
            { minWidth: 1780, cols: 3, spacing: 40 },
            { minWidth: 1210, cols: 2, spacing: 40 },
            { minWidth: 0, cols: 1, spacing: 30 },
          ]}
          className={classes.grid}
          cols={3}
        >
          <Card
            badge="Private"
            language="TypeScript"
            languageColor="blue"
            lastUpdated="Updated 7 hours ago"
            text="Dashboard to organize github projects"
            title="Github-dashboard"
          />
          <Card
            badge="Private"
            language="TypeScript"
            languageColor="blue"
            lastUpdated="Updated 7 hours ago"
            text="Dashboard to organize github projects"
            title="Github-dashboard"
          />
          <Card
            badge="Private"
            language="TypeScript"
            languageColor="blue"
            lastUpdated="Updated 7 hours ago"
            text="Dashboard to organize github projects"
            title="Github-dashboard"
          />
          <Card
            badge="Private"
            language="TypeScript"
            languageColor="blue"
            lastUpdated="Updated 7 hours ago"
            text="Dashboard to organize github"
            title="Github-dashboard"
          />
        </SimpleGrid>
      </div>
    </>
  );
}

export { Repositories };
