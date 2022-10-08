import {
  Card as CardMantine,
  Group,
  Progress,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconAlertCircle, IconBulb, IconCheckupList } from "@tabler/icons";
import { useStyles } from "./RepositoryStats.styles";

interface Progress {
  completed: number;
  incomplete: number;
  percentage: number;
}

interface Props {
  features: Progress;
  issues: Progress;
  name: string;
  tasks: Progress;
}

function Card({ features, issues, name, tasks }: Props) {
  const { classes } = useStyles();
  const { colors } = useMantineTheme();

  return (
    <CardMantine withBorder className={classes.card} p="lg" radius="md">
      <Group position="apart">
        <Title pb={5} size={18}>
          Stats
        </Title>
      </Group>
      <Text color="dimmed" size={15}>
        {name}
      </Text>
      <Stack pt={"md"}>
        <>
          <Group position="apart">
            <Group align="center" spacing={5}>
              <IconBulb className={classes.icon} size={20} />
              <Text color="dimmed" size={14}>
                Features
              </Text>
            </Group>
            <Text color="dimmed" size={14}>
              {features.completed}/{features.completed + features.incomplete} (
              {features.percentage}%)
            </Text>
          </Group>
          <Progress
            sections={[
              {
                value: features.percentage,
                color: colors.blue[4],
                tooltip: "33%",
              },
            ]}
            size={7}
          />
        </>
        <>
          <Group position="apart">
            <Group align="center" spacing={5}>
              <IconCheckupList className={classes.icon} size={20} />
              <Text color="dimmed" size={14}>
                Tasks
              </Text>
            </Group>
            <Text color="dimmed" size={14}>
              {tasks.completed}/{tasks.completed + tasks.incomplete} (
              {tasks.percentage}%)
            </Text>
          </Group>
          <Progress
            sections={[
              {
                value: tasks.percentage,
                color: colors.blue[4],
                tooltip: "33%",
              },
            ]}
            size={7}
          />
        </>
        <>
          <Group position="apart">
            <Group align="center" spacing={5}>
              <IconAlertCircle className={classes.icon} size={20} />
              <Text color="dimmed" size={14}>
                Issues
              </Text>
            </Group>
            <Text color="dimmed" size={14}>
              {issues.completed}/{issues.completed + issues.incomplete} (
              {issues.percentage}%)
            </Text>
          </Group>
          <Progress
            sections={[
              {
                value: issues.percentage,
                color: colors.blue[4],
                tooltip: "33%",
              },
            ]}
            size={7}
          />
        </>
      </Stack>
    </CardMantine>
  );
}

export { Card };
