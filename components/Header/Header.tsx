import { Group, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { Tab, Tabs } from "../Tabs";
import { useStyles } from "./Header.styles";

interface Props {
  tabs?: Tab[];
}

function Header({ tabs }: Props) {
  const { classes } = useStyles();
  const { query } = useRouter();

  return (
    <Group align="center" className={classes.header}>
      <Title order={2}>{query.repository as string}</Title>
      {tabs && <Tabs tabs={tabs} />}
    </Group>
  );
}

export { Header };
