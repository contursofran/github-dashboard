import { Group, Title } from "@mantine/core";
import { useStyles } from "./Header.styles";
import { Tab, Tabs } from "./Tabs";
import { useStore } from "../../../store";

interface Props {
  currentPage: string;
  tabs?: Tab[];
}

function Header({ currentPage, tabs }: Props) {
  const { classes } = useStyles();
  const selectedProject = useStore((state) => state.selectedProject);

  return (
    <Group className={classes.header} position="center" align="center">
      <Title order={2}>
        {selectedProject ? selectedProject : currentPage.split("/")[0]}
      </Title>
      {tabs && <Tabs selectedProject={selectedProject} tabs={tabs} />}
    </Group>
  );
}

export { Header };
