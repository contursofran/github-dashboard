import { Text, Timeline as TimelineMantine } from "@mantine/core";
import {
  IconGitCommit,
  IconGitCompare,
  IconGitPullRequest,
  IconGitPullRequestClosed,
  IconStar,
} from "@tabler/icons";

interface CommitEvent {
  commit: string;
  date: string | null;
  key: string;
  link: string;
  repository: string;
  size: number;
}

interface StarEvent {
  date: string | null;
  key: string;
  link: string;
  repository: string;
}

interface IssueEvent {
  action?: string;
  date: string | null;
  key: string;
  link?: string;
  repository: string;
}

interface PullEvent {
  action?: string;
  date: string | null;
  key: string;
  link?: string;
  request: string;
}

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

const commitEvent = (props: CommitEvent) => {
  const { commit, date, key, link, repository, size } = props;

  return (
    <TimelineMantine.Item
      bullet={<IconGitCommit size={16} />}
      bulletSize={24}
      key={key}
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
            <Text
              inherit
              component="a"
              href={link}
              target="_blank"
              variant="link"
            >
              {repository.split("/")[1]}
            </Text>{" "}
          </Text>

          <Text mt={4} size="xs">
            {date && getDate(date)}
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
            <Text
              inherit
              component="a"
              href={link}
              target="_blank"
              variant="link"
            >
              {repository.split("/")[1]}
            </Text>{" "}
          </Text>

          <Text mt={4} size="xs">
            {date && getDate(date)}
          </Text>
        </>
      )}
    </TimelineMantine.Item>
  );
};

const starEvent = ({ date, key, link, repository }: StarEvent) => {
  return (
    <TimelineMantine.Item
      bullet={<IconStar size={14} />}
      bulletSize={24}
      key={key}
      title="Star"
    >
      <Text color="dimmed" size="sm">
        You&apos;ve starred{" "}
        <Text inherit component="a" href={link} target="_blank" variant="link">
          {repository.split("/")[1]}
        </Text>
      </Text>
      <Text mt={4} size="xs">
        {date && getDate(date)}
      </Text>
    </TimelineMantine.Item>
  );
};

const issueEvent = ({ action, date, key, link, repository }: IssueEvent) => {
  return (
    <TimelineMantine.Item
      bullet={<IconGitCompare size={14} />}
      bulletSize={24}
      key={key}
      title="Issue"
    >
      <Text color="dimmed" size="sm">
        You&apos;ve {action} an issue on{" "}
        <Text inherit component="a" href={link} target="_blank" variant="link">
          {repository.split("/")[1]}
        </Text>
      </Text>
      <Text mt={4} size="xs">
        {date && getDate(date)}
      </Text>
    </TimelineMantine.Item>
  );
};

const pullEvent = ({ action, date, key, link, request }: PullEvent) => {
  return (
    <TimelineMantine.Item
      bullet={
        action === "closed" ? (
          <IconGitPullRequestClosed size={16} />
        ) : (
          <IconGitPullRequest size={16} />
        )
      }
      bulletSize={24}
      key={key}
      title="Pull Request"
    >
      <Text color="dimmed" size="sm">
        You&apos;ve {action} a pull request{" "}
        <Text inherit component="a" href={link} target="_blank" variant="link">
          {request}
        </Text>{" "}
      </Text>
      <Text mt={4} size="xs">
        {date && getDate(date)}
      </Text>
    </TimelineMantine.Item>
  );
};

export { commitEvent, starEvent, issueEvent, pullEvent };
