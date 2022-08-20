import { Group, Title } from "@mantine/core";
import { useStore } from "../../store";
import { Tab, Tabs } from "../Tabs";
import { useStyles } from "./Header.styles";

interface Props {
  tabs?: Tab[];
}

function Header({ tabs }: Props) {
  const { classes } = useStyles();
  const selectedProject = useStore((state) => state.selectedProject);
  const currentPage = useStore((state) => state.currentPage);

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
