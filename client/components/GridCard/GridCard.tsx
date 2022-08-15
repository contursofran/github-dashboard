import {
  Card,
  ColorSwatch,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useStyles } from "./GridCard.styles";

interface Props {
  children?: React.ReactNode;
  title: string;
  counter: number;
}

function GridCard({ title, counter }: Props) {
  const { classes } = useStyles();
  const { colors, spacing } = useMantineTheme();

  return (
    <Card p="lg" radius="md" withBorder className={classes.card}>
      <Group position="apart">
        <Group spacing="xs">
          <Title order={4}>{title}</Title>
          <ColorSwatch color={colors.gray[7]}>{counter}</ColorSwatch>
        </Group>
        <Group spacing="xs">
          <IconPlus size={spacing.lg} />
          <Title order={4}>Add new</Title>
        </Group>
      </Group>
    </Card>
  );
}

export { GridCard };
