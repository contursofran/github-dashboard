import { upperFirst } from "@mantine/hooks";
import { trpc } from "../../../../utils/trpc";
import { getProgress } from "../../utils/getProgress";
import { Card } from "./Card";

export function RepositoryStats() {
  const { data: repositories } = trpc.useQuery([
    "repository.getThreeWithMostTasks",
  ]);

  const cards = Array.from(Array(3).keys());

  if (!repositories) {
    return <>Loading</>;
  }

  return (
    <>
      {cards.map((index) =>
        repositories[index] ? (
          <Card
            features={getProgress(repositories[index].features)}
            issues={getProgress(repositories[index].issues)}
            key={index}
            name={upperFirst(repositories[index].name)}
            tasks={getProgress(repositories[index].tasks)}
          />
        ) : (
          <Card
            features={getProgress([])}
            issues={getProgress([])}
            key={index}
            name={"No repository found"}
            tasks={getProgress([])}
          />
        )
      )}
    </>
  );
}
