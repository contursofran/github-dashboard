import {
  Paper,
  ScrollArea,
  Skeleton,
  Stack,
  Timeline as TimelineMantine,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { commitEvent, issueEvent, pullEvent, starEvent } from "../TimelineItem";
import { useStyles } from "./Timeline.styles";

function Timeline({ username }: { username: string | undefined }) {
  // use of any is required because the types are incorrect in the library
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [events, setEvents] = useState<any[]>([]);
  const { classes } = useStyles();
  const { data } = trpc.useQuery(["github.getUserEvents", { username }], {
    enabled: !!username,
  });
  const skeletonItems = Array.from(Array(5).keys());

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  if (!data) {
    return (
      <Paper withBorder className={classes.card} p="lg" radius="md">
        <Stack>
          <Title order={4}>Last activity</Title>
          {skeletonItems.map((item) => (
            <div key={item}>
              <Skeleton height="20px" width="35%" />
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" mb={8} width="30%" />
            </div>
          ))}
        </Stack>
      </Paper>
    );
  }
  return (
    <>
      <Paper withBorder className={classes.card} p="lg" radius="md">
        <Stack sx={{ height: "100%" }}>
          <Title order={4}>Last activity</Title>
          <ScrollArea
            classNames={{
              thumb: classes.scrollBarThumb,
              scrollbar: classes.scrollBar,
              root: classes.scrollBarRoot,
            }}
            pr="xs"
            scrollHideDelay={500}
            style={{ flex: "1 1 0" }}
          >
            <TimelineMantine m="xs">
              {events.map((event) => {
                if (event.type === "PushEvent") {
                  return commitEvent({
                    date: event.created_at,
                    commit: event.payload.commits
                      ? event.payload.commits[0].message
                      : "",
                    repository: event.repo.name,
                    size: event.payload.size ? event.payload.size : 0,
                    link:
                      "https://github.com/" +
                      event.repo.url.split("/")[4] +
                      "/" +
                      event.repo.url.split("/")[5],
                    key: event.id,
                  });
                } else if (event.type === "WatchEvent") {
                  return starEvent({
                    date: event.created_at,
                    repository: event.repo.name,
                    link:
                      "https://github.com/" +
                      event.repo.url.split("/")[4] +
                      "/" +
                      event.repo.url.split("/")[5],
                    key: event.id,
                  });
                } else if (event.type === "IssuesEvent") {
                  return issueEvent({
                    date: event.created_at,
                    action: event.payload.action,
                    repository: event.repo.name,
                    link:
                      "https://github.com/" +
                      event.payload.issue?.url.split("/")[4] +
                      "/" +
                      event.payload.issue?.url.split("/")[5],
                    key: event.id,
                  });
                } else if (event.type === "PullRequestEvent") {
                  return pullEvent({
                    date: event.created_at,
                    action: event.payload.action,
                    request: event.payload.pull_request
                      ? event.payload.pull_request.title
                      : "",
                    link:
                      "https://github.com/" +
                      event.payload.pull_request?.url.split("/")[4] +
                      "/" +
                      event.payload.pull_request?.url.split("/")[5] +
                      "/pull/" +
                      event.payload.pull_request?.url.split("/")[7],
                    key: event.id,
                  });
                }
              })}
            </TimelineMantine>
          </ScrollArea>
        </Stack>
      </Paper>
    </>
  );
}

export { Timeline };
