import { upperFirst } from "@mantine/hooks";
import { trpc } from "../../../../utils/trpc";
import { getProgress } from "../../helpers/getProgress";
import { RepositoryStatsCard } from "./RepositoryStatsCard";
import { RepositoryStatsSkeleton } from "./RepositoryStatsSkeleton";

export function RepositoryStats() {
  const { data: repositories } = trpc.useQuery([
    "repository.getThreeWithMostTasks",
  ]);

  const cards = Array.from(Array(3).keys());

  if (!repositories) {
    return (
      <>
        {cards.map((index) => (
          <RepositoryStatsSkeleton key={"skeleton" + index} />
        ))}
      </>
    );
  }

  return (
    <>
      {cards.map((index) =>
        repositories[index] ? (
          <RepositoryStatsCard
            features={getProgress(repositories[index].features)}
            issues={getProgress(repositories[index].issues)}
            key={index}
            name={upperFirst(repositories[index].name)}
            tasks={getProgress(repositories[index].tasks)}
          />
        ) : (
          <RepositoryStatsCard
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
