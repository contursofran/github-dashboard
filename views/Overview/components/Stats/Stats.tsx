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
import { Fragment, useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { filterStats } from "../../utils/filterStats";
import { useStyles } from "./Stats.styles";

interface Rank {
  level: string;
  score: number;
}

const labels = [
  "Total Stars Earned:",
  "Total Commits:",
  "Total PRs:",
  "Total Issues:",
  "Contributed to:",
];

function Stats({ username }: { username: string | undefined }) {
  const { classes } = useStyles();
  const [values, setValues] = useState([0, 0, 0, 0, 0]);
  const [rank, setRank] = useState<Rank>();
  const { data } = trpc.useQuery(["github.getUserStats", { username }]);

  useEffect(() => {
    if (data) {
      const { filteredStats, rank } = filterStats(data);
      setValues(filteredStats);
      setRank(rank);
    }
  }, [data]);

  if (!data || !values) {
    return (
      <Card withBorder className={classes.card} p="lg" radius="md">
        <Stack justify="space-between" sx={{ height: "100%" }}>
          <Title size={18}>Github Stats</Title>
          <Group>
            <Stack
              justify="space-between"
              sx={{ height: "100%", width: "58%" }}
            >
              <SimpleGrid cols={1}>
                <Skeleton height={20} width={"65%"} />
                <Skeleton height={20} width={"65%"} />
                <Skeleton height={20} width={"65%"} />
                <Skeleton height={20} width={"65%"} />
                <Skeleton height={20} width={"65%"} />
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
      <Stack justify="space-between" sx={{ height: "100%" }}>
        <Title size={18}>Github Stats</Title>
        <Group>
          <Stack justify="space-between" sx={{ height: "100%" }}>
            <SimpleGrid cols={2}>
              {labels.map((label, index) => (
                <Fragment key={label}>
                  <Text color="dimmed" size="sm">
                    {label}
                  </Text>
                  <Text color="dimmed" size="sm">
                    {values[index]}
                  </Text>
                </Fragment>
              ))}
            </SimpleGrid>
          </Stack>
          <Container>
            <RingProgress
              label={
                <Text align="center" color="dimmed" size={23}>
                  {rank?.level}
                </Text>
              }
              sections={[
                { value: rank?.score ? rank?.score : 100, color: "blue.3" },
              ]}
              size={130}
              thickness={6}
            />
          </Container>
        </Group>
      </Stack>
    </Card>
  );
}

export { Stats };
