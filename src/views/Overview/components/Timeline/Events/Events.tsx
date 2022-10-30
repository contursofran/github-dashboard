import { Timeline, useMantineTheme } from "@mantine/core";
import {
  IconGitCommit,
  IconGitCompare,
  IconGitPullRequest,
  IconGitPullRequestClosed,
  IconStar,
} from "@tabler/icons";
import { Commit } from "./Commit";
import { Issue } from "./Issue";
import { PullRequest } from "./PullRequest";
import { Star } from "./Star";

function Events({ events }: { events: any[] }) {
  const { colorScheme, colors } = useMantineTheme();

  return (
    <Timeline m="xs">
      {events.map((event) => {
        switch (event.type) {
          case "PushEvent":
            return (
              <Timeline.Item
                bullet={
                  <IconGitCommit
                    color={colorScheme === "dark" ? colors.gray[5] : "gray"}
                    size={16}
                  />
                }
                bulletSize={24}
                key={event.id}
                title="Commits"
              >
                <Commit event={event} />
              </Timeline.Item>
            );
          case "WatchEvent":
            return (
              <Timeline.Item
                bullet={
                  <IconStar
                    color={colorScheme === "dark" ? colors.gray[5] : "gray"}
                    size={14}
                  />
                }
                bulletSize={24}
                key={event.id}
                title="Star"
              >
                <Star event={event} />
              </Timeline.Item>
            );
          case "IssuesEvent":
            return (
              <Timeline.Item
                bullet={
                  <IconGitCompare
                    color={colorScheme === "dark" ? colors.gray[5] : "gray"}
                    size={14}
                  />
                }
                bulletSize={24}
                key={event.id}
                title="Issue"
              >
                <Issue event={event} />
              </Timeline.Item>
            );
          case "PullRequestEvent":
            return (
              <Timeline.Item
                bullet={
                  event.payload.action === "closed" ? (
                    <IconGitPullRequestClosed
                      color={colorScheme === "dark" ? colors.gray[5] : "gray"}
                      size={16}
                    />
                  ) : (
                    <IconGitPullRequest
                      color={colorScheme === "dark" ? colors.gray[5] : "gray"}
                      size={16}
                    />
                  )
                }
                bulletSize={24}
                key={event.id}
                title="Pull Request"
              >
                <PullRequest event={event} />
              </Timeline.Item>
            );
        }
      })}
    </Timeline>
  );
}

export { Events };
