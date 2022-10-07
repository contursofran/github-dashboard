import {
  Card,
  Container,
  Group,
  RingProgress,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconBook,
  IconGitCommit,
  IconGitPullRequest,
  IconStar,
} from "@tabler/icons";
import { Fragment, useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { filterStats } from "../../utils/filterStats";
import { useStyles } from "./GithubStats.styles";

interface Rank {
  level: string;
  score: number;
}

function GithubStats({ username }: { username: string | undefined }) {
  const { classes } = useStyles();
  const [values, setValues] = useState([0, 0, 0, 0, 0]);
  const [rank, setRank] = useState<Rank>();
  const { data } = trpc.useQuery(["github.getUserStats", { username }]);

  const labels = [
    {
      label: "Total Stars Earned:",
      icon: <IconStar className={classes.icon} size={18} />,
    },
    {
      label: "Total Commits:",
      icon: <IconGitCommit className={classes.icon} size={18} />,
    },
    {
      label: "Total Issues:",
      icon: <IconAlertCircle className={classes.icon} size={18} />,
    },
    {
      label: "Total PRs:",
      icon: <IconGitPullRequest className={classes.icon} size={18} />,
    },
    {
      label: "Contributed to:",
      icon: <IconBook className={classes.icon} size={18} />,
    },
  ];

  useEffect(() => {
    if (data) {
      const { filteredStats, rank } = filterStats(data);
      setValues(filteredStats);
      setRank(rank);
    }
  }, [data]);

  if (!data || !values) {
    return (
      <Card
        withBorder
        className={classes.card}
        p="lg"
        radius="md"
        style={{ height: "200px" }}
      >
        <Stack sx={{ height: "100%" }}>
          <Group>
            <Stack justify="space-between" sx={{ width: "58%" }}>
              <Title size={18}>Github Stats</Title>
              <SimpleGrid cols={1} spacing="xs">
                <Skeleton height={16} width={"65%"} />
                <Skeleton height={16} width={"65%"} />
                <Skeleton height={16} width={"65%"} />
                <Skeleton height={16} width={"65%"} />
                <Skeleton height={16} width={"65%"} />
              </SimpleGrid>
            </Stack>
            <Container>
              <Skeleton circle height={111} />
            </Container>
          </Group>
        </Stack>
      </Card>
    );
  }

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Group>
        <Stack sx={{ height: "50%", width: "45%" }}>
          <Title size={18}>Github Stats</Title>
          <div className={classes.grid}>
            {labels.map((label, index) => (
              <Fragment key={label.label}>
                <Group>
                  {label.icon}
                  <Text color="dimmed" size="sm">
                    {label.label}
                  </Text>
                </Group>
                <Text color="dimmed" size="sm" sx={{ width: "40%" }}>
                  {values[index]}
                </Text>
              </Fragment>
            ))}
          </div>
        </Stack>
        <Container pl={"15%"}>
          <RingProgress
            label={
              <Text align="center" color="dimmed" size={21}>
                {rank?.level}
              </Text>
            }
            sections={[
              { value: rank?.score ? rank?.score : 100, color: "blue.3" },
            ]}
            size={110}
            thickness={6}
          />
        </Container>
      </Group>
    </Card>
  );
}

export { GithubStats };