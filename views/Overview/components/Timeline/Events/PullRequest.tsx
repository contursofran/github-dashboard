import { Text } from "@mantine/core";
import { getDate } from "../../../utils/date";

function PullRequest({ event }: { event: any }) {
  const action = event.payload.action;
  const date = event.created_at;
  const request = event.payload.pull_request
    ? event.payload.pull_request.title
    : "";
  const link =
    "https://github.com/" +
    event.repo.url.split("/")[4] +
    "/" +
    event.repo.url.split("/")[5];

  return (
    <>
      <Text color="dimmed" size="sm">
        You&apos;ve {action} a pull request{" "}
        <Text inherit component="a" href={link} target="_blank" variant="link">
          {request}
        </Text>{" "}
      </Text>
      <Text mt={4} size="xs">
        {date && getDate(date)}
      </Text>
    </>
  );
}

export { PullRequest };
