import { upperFirst } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { guestUser } from "../../../../utils/data";
import { trpc } from "../../../../utils/trpc";
import { getProgress } from "../../helpers/getProgress";
import { RepositoryStatsCard } from "./RepositoryStatsCard";
import { RepositoryStatsSkeleton } from "./RepositoryStatsSkeleton";

export function RepositoryStats() {
  const { status } = useSession();
  const { data: repositories } = trpc.useQuery(
    ["repository.getThreeWithMostTasks"],
    { enabled: status === "authenticated" }
  );

  const cards = Array.from(Array(3).keys());

  if (status === "unauthenticated") {
    return (
      <>
        {cards.map((index) =>
          guestUser.repositories[index] ? (
            <RepositoryStatsCard
              features={getProgress(
                guestUser.repositories[index].features.cards
              )}
              issues={getProgress(guestUser.repositories[index].issues.cards)}
              key={guestUser.repositories[index].name}
              name={guestUser.repositories[index].name}
              tasks={getProgress(guestUser.repositories[index].tasks.cards)}
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
