import { Text } from "@mantine/core";
import { getDate } from "../../../utils/date";

function Commit({ event }: { event: any }) {
  const size = event.payload.size ? event.payload.size : 0;
  const date = event.create_at;
  const text = event.payload.commits ? event.payload.commits[0].message : "";
  const repository = event.repo.name;
  const link =
    "https://github.com/" +
    event.repo.url.split("/")[4] +
    "/" +
    event.repo.url.split("/")[5];

  return (
    <>
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
              {text}
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
    </>
  );
}

export { Commit };
