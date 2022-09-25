import { Group, Paper, Stack, Text, Timeline, Title } from "@mantine/core";
import { Endpoints } from "@octokit/types";
import { IconGitBranch, IconGitCommit } from "@tabler/icons";
import { trpc } from "../../../../utils/trpc";
import { data } from "./data";
import { useStyles } from "./Events.styles";

export type UserEvents =
  Endpoints["GET /users/{username}/events"]["response"]["data"];

interface CommitEvent {
  commit: string;
  date: string;
  repository: string;
  size: number;
}

function Events({ username }: { username: string | undefined }) {
  const { classes } = useStyles();
  // const { data: events } = trpc.useQuery(
  //   ["github.getUserEvents", { username }],
  //   { enabled: !!username }
  // );

  const getDate = (date: string) => {
    const now = new Date();
    const eventDate = new Date(date);
    const diff = now.getTime() - eventDate.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }

    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  const commitEvent = ({ commit, date, repository, size }: CommitEvent) => {
    return (
      <Timeline.Item
        bullet={<IconGitCommit size={16} />}
        bulletSize={24}
        title="Commits"
      >
        {size > 1 ? (
          <>
            <Text color="dimmed" size="sm">
              You&apos;ve pushed{" "}
              <Text inherit component="span">
                {size}
              </Text>{" "}
              commits to{" "}
              <Text inherit color="blue.4" component="span">
                {repository.split("/")[1]}
              </Text>{" "}
            </Text>

            <Text mt={4} size="xs">
              {getDate(date)}
            </Text>
          </>
        ) : (
          <>
            <Text color="dimmed" size="sm">
              You&apos;ve pushed{" "}
              <Text inherit color="gray.3" component="span">
                {commit}
              </Text>{" "}
              to{" "}
              <Text inherit color="blue.4" component="span">
                {repository.split("/")[1]}
              </Text>{" "}
            </Text>

            <Text mt={4} size="xs">
              {getDate(date)}
            </Text>
          </>
        )}
      </Timeline.Item>
    );
  };

  const starEvent = () => {
    return (
      <Timeline.Item
        bullet={<IconGitBranch size={16} />}
        bulletSize={24}
        title="Push"
      >
        <Text color="dimmed" size="sm">
          You&apos;ve pushed commits to
          <Text inherit component="span" variant="link">
            fix-notifications branch
          </Text>
        </Text>
        <Text mt={4} size="xs">
          52 minutes ago
        </Text>
      </Timeline.Item>
    );
  };

  return (
    <>
      <Paper withBorder className={classes.card} p="lg">
        <Stack>
          <Title order={4}>Last activity</Title>
          <Timeline>
            {data.map((event) => {
              if (event.type === "PushEvent") {
                return commitEvent({
                  date: event.created_at,
                  commit: event.payload.commits
                    ? event.payload.commits[0].message
                    : "",
                  repository: event.repo.name,
                  size: event.payload.size ? event.payload.size : 0,
                });
              }
            })}
          </Timeline>
        </Stack>
      </Paper>
    </>
  );
}

export { Events };
