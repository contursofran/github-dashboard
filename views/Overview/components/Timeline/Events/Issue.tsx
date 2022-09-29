import { Text } from "@mantine/core";
import { getDate } from "../../../utils/date";

function Issue({ event }: { event: any }) {
  const action = event.payload.action;
  const date = event.create_at;
  const repository = event.repo.name;
  const link =
    "https://github.com/" +
    event.repo.url.split("/")[4] +
    "/" +
    event.repo.url.split("/")[5];

  return (
    <>
      <Text color="dimmed" size="sm">
        You&apos;ve {action} an issue on{" "}
        <Text inherit component="a" href={link} target="_blank" variant="link">
          {repository.split("/")[1]}
        </Text>
      </Text>
      <Text mt={4} size="xs">
        {date && getDate(date)}
      </Text>
    </>
  );
}

export { Issue };
