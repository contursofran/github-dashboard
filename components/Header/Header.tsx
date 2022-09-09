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
  const selectedRepository = useStore((state) => state.selectedRepository);

  if (currentPage === "[repository]") {
    currentPage = selectedRepository;
  }

  return (
    <Group align="center" className={classes.header}>
      <Title order={2}>
        {currentPage.includes("[project]")
          ? currentPage
          : currentPage.split("/")[0]}
      </Title>
      {tabs && <Tabs selectedRepository={selectedRepository} tabs={tabs} />}
    </Group>
  );
}

export { Header };
