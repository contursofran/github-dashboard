import {
  Card,
  Container,
  Group,
  RingProgress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconAlertCircle,
  IconBook,
  IconGitCommit,
  IconGitPullRequest,
  IconStar,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { guestUser } from "../../../../utils/data";
import { primaryColorShade } from "../../../../utils/mantine";
import { trpc } from "../../../../utils/trpc";
import { filterStats, filterStatsGuest } from "../../helpers/filterStats";
import { useStyles } from "./GithubStats.styles";
import { GithubStatsSkeleton } from "./GithubStatsSkeleton";

interface Rank {
  level: string;
  score: number;
}

function GithubStats() {
  const { classes, theme } = useStyles();
  const { status } = useSession();
  const largeScreen = useMediaQuery("(min-width: 1600px)");
  const [values, setValues] = useState([0, 0, 0, 0, 0]);
  const [rank, setRank] = useState<Rank>();
  const { data } = trpc.useQuery(["github.getUserStats"], {
    enabled: status === "authenticated",
  });

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
    } else if (status === "unauthenticated") {
      const { filteredStats, rank } = filterStatsGuest(
        guestUser.stats.githubStats
      );
      setValues(filteredStats);
      setRank(rank);
    }
  }, [data, status]);

  if ((!data || !values || !rank) && status !== "unauthenticated") {
    return <GithubStatsSkeleton />;
  }

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Group position="apart">
        <Stack
          style={{ width: "fit-content", flexBasis: "fit-content" }}
          sx={{
            height: "50%",
            width: "45%",
          }}
        >
          <Title size={18}>Github Stats</Title>
          <div className={classes.grid}>
            {labels.map((label, index) => (
              <Fragment key={label.label}>
                <Group>
                  {label.icon}
                  <Text color="dimmed" size={"sm"}>
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
        <Container mr={"5%"}>
          <RingProgress
            label={
              <Text align="center" color="dimmed" size={23}>
                {rank?.level}
              </Text>
            }
            sections={[
              {
                value: rank?.score ? rank?.score : 100,
                color: primaryColorShade(theme),
              },
            ]}
            size={largeScreen ? 120 : 100}
            thickness={6}
          />
        </Container>
      </Group>
    </Card>
  );
}

export { GithubStats };
