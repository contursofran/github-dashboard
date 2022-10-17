import { Timeline } from "@mantine/core";
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
  return (
    <Timeline m="xs">
      {events.map((event) => {
        switch (event.type) {
          case "PushEvent":
            return (
              <Timeline.Item
                bullet={<IconGitCommit size={16} />}
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
                bullet={<IconStar size={14} />}
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
                bullet={<IconGitCompare size={14} />}
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
                    <IconGitPullRequestClosed size={16} />
                  ) : (
                    <IconGitPullRequest size={16} />
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
