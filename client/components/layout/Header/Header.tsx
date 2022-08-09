import { Group, Stack, Text, Title } from "@mantine/core";
import { useStyles } from "./Header.styles";
import { Tab, Tabs } from "./Tabs";

interface Props {
  currentPage: string;
  tabs?: Tab[];
}

function Header({ currentPage, tabs }: Props) {
  const { classes } = useStyles();

  return (
    <Group className={classes.header} position="center" align="center">
      <Stack>
        <Group>
          <Title className={classes.title} order={5}>
            {currentPage.split("/")[0]}{" "}
            <Text className={classes.subTitle} inherit component="span">
              / {currentPage.split("/")[1]}
            </Text>
          </Title>
        </Group>
        <Title order={2}>{currentPage.split("/")[0]}</Title>
      </Stack>
      {tabs && <Tabs tabs={tabs} />}
    </Group>
  );
}

export { Header };
