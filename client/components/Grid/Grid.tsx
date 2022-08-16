import {
  Card,
  ColorSwatch,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useStyles } from "./Grid.styles";

interface Props {
  children: React.ReactNode;
  title: string;
  counter: number;
}

function Grid({ children, title, counter }: Props) {
  const { classes } = useStyles();
  const { colors, spacing } = useMantineTheme();

  return (
    <Card p="lg" radius="md" withBorder className={classes.card}>
      <Group mb={"lg"} position="apart">
        <Group spacing="xs">
          <Title className={classes.title} order={4}>
            {title}
          </Title>
          <ColorSwatch color={colors.gray[7]}>{counter}</ColorSwatch>
        </Group>
        <Group spacing="xs">
          <IconPlus size={spacing.lg} />
          <Title order={4}>Add new</Title>
        </Group>
      </Group>
      {children}
    </Card>
  );
}

export { Grid };
