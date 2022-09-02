import { Group, Title } from "@mantine/core";
import { useStore } from "../../store";
import { Tab, Tabs } from "../Tabs";
import { useStyles } from "./Header.styles";

interface Props {
  currentPage: string;
  tabs?: Tab[];
}

function Header({ currentPage, tabs }: Props) {
  const { classes } = useStyles();
  const selectedProject = useStore((state) => state.selectedProject);

  if (currentPage === "[repository]") {
    currentPage = selectedProject;
  }

  return (
    <Group align="center" className={classes.header}>
      <Title order={2}>
        {currentPage.includes("[project]")
          ? currentPage
          : currentPage.split("/")[0]}
      </Title>
      {tabs && <Tabs selectedProject={selectedProject} tabs={tabs} />}
    </Group>
  );
}

export { Header };
