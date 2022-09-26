import {
  Paper,
  ScrollArea,
  Stack,
  Timeline as TimelineMantine,
  Title,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { commitEvent, issueEvent, pullEvent, starEvent } from "../TimelineItem";
import { useStyles } from "./Timeline.styles";

function Timeline({ username }: { username: string | undefined }) {
  const { classes } = useStyles();
  const { height, ref } = useElementSize();
  const [scrollHeight, setScrollHeight] = useState(700);

  // use of any is required because the types are incorrect in the library
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [events, setEvents] = useState<any[]>([]);

  const { data } = trpc.useQuery(["github.getUserEvents", { username }], {
    enabled: !!username,
  });

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  useEffect(() => {
    setScrollHeight(height - 50);
  }, [height]);

  if (!events) {
    return (
      <Paper withBorder className={classes.card} p="lg" radius="md" ref={ref}>
        <Stack>
          <Title order={4}>Last activity</Title>
          <ScrollArea
            classNames={{
              thumb: classes.scrollBarThumb,
              scrollbar: classes.scrollBar,
              root: classes.scrollBarRoot,
            }}
            pr="xs"
            scrollHideDelay={500}
            style={{ height: scrollHeight }}
          >
            <TimelineMantine m="xs">
              <TimelineMantine.Item title="Loading..." />
            </TimelineMantine>
          </ScrollArea>
        </Stack>
      </Paper>
    );
  }
  return (
    <>
      <Paper withBorder className={classes.card} p="lg" radius="md" ref={ref}>
        <Stack>
          <Title order={4}>Last activity</Title>
          <ScrollArea
            classNames={{
              thumb: classes.scrollBarThumb,
              scrollbar: classes.scrollBar,
              root: classes.scrollBarRoot,
            }}
            pr="xs"
            scrollHideDelay={500}
            style={{ height: scrollHeight }}
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
