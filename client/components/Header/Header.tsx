import { Group, Title } from "@mantine/core";
import { useStore } from "../../store";
import { useStyles } from "./Header.styles";
import { Tab, Tabs } from "./Tabs";

interface Props {
  currentPage: string;
  tabs?: Tab[];
}

function Header({ currentPage, tabs }: Props) {
  const { classes } = useStyles();
  const selectedProject = useStore((state) => state.selectedProject);

  return (
    <Group align="center" className={classes.header}>
      <Title order={2}>
        {selectedProject ? selectedProject : currentPage.split("/")[0]}
      </Title>
      {tabs && <Tabs selectedProject={selectedProject} tabs={tabs} />}
    </Group>
  );
}

export { Header };
