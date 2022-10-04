import {
  Badge,
  createStyles,
  Group,
  Paper,
  Progress,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconSwimming } from "@tabler/icons";

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    width: "100%",
  },

  icon: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
  papper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

export function StatsCard() {
  const { classes } = useStyles();

  return (
    <Paper withBorder className={classes.card} mt={ICON_SIZE / 3} radius="md">
      <ThemeIcon className={classes.icon} radius={ICON_SIZE} size={ICON_SIZE}>
        <IconSwimming size={34} stroke={1.5} />
      </ThemeIcon>

      <Text align="center" className={classes.title} weight={700}>
        Swimming challenge
      </Text>
      <Text align="center" color="dimmed" size="sm">
        32 km / week
      </Text>

      <Group mt="xs" position="apart">
        <Text color="dimmed" size="sm">
          Progress
        </Text>
        <Text color="dimmed" size="sm">
          62%
        </Text>
      </Group>

      <Progress mt={5} value={62} />

      <Group mt="md" position="apart">
        <Text size="sm">20 / 36 km</Text>
        <Badge size="sm">4 days left</Badge>
      </Group>
    </Paper>
  );
}
