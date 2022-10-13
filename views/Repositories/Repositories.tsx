import { Group, Pagination, SimpleGrid, Stack, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { guestUser } from "../../utils/data";
import { Card } from "./components/Card";
import { SkeletonCard } from "./components/SkeletonCard";
import { useRepositories, Visibility } from "./hooks/useRepositories";
import { useStyles } from "./Repositories.styles";
import {
  filterRepositories,
  mapRepositories,
} from "./utils/filterRepositories";
import {
  getPagination,
  getPaginationData,
  getPaginationDataGuest,
  MAX_REPOS_PER_PAGE,
} from "./utils/pagination";

function Repositories({ visibility }: { visibility: Visibility }) {
  const { classes } = useStyles();
  const [activePage, setPage] = useState(1);
  const { repositories, status } = useRepositories(visibility);
  const user = useSession();

  const getSkeletons = () => {
    const skeletons = [];

    for (let i = 0; i < MAX_REPOS_PER_PAGE; i++) {
      skeletons.push(<SkeletonCard key={i} />);
    }

    return skeletons;
  };

  if (user.status === "unauthenticated") {
    return (
      <Stack
        justify="space-between"
        p={30}
        style={{ width: "100%", height: "100%" }}
      >
        <div className={classes.content}>
          <SimpleGrid
            breakpoints={[
              { minWidth: 1780, cols: 3, spacing: 30 },
              { minWidth: 1210, cols: 2, spacing: 30 },
              { minWidth: 0, cols: 1, spacing: 30 },
            ]}
            className={classes.grid}
            cols={3}
            spacing={30}
          >
            {getPaginationDataGuest(guestUser, activePage).map((repo) => {
              if (repo.visibility === visibility) {
                return (
                  <Card
                    key={repo.name}
                    language={repo.language}
                    lastUpdated={repo.pushed_at}
                    text={repo.description}
                    title={repo.name}
                    visibility={repo.visibility}
                  />
                );
              }
            })}
          </SimpleGrid>
        </div>
        <Group align="center" position="center">
          {guestUser.repositories.length > 12 && (
            <Pagination
              page={activePage}
              total={getPagination(guestUser.repositories.length)}
              onChange={setPage}
            />
          )}
        </Group>
      </Stack>
    );
  }

  if (status === "loading" || repositories.length === 0) {
    return (
      <div className={classes.content}>
        <SimpleGrid
          breakpoints={[
            { minWidth: 1780, cols: 3, spacing: 40 },
            { minWidth: 1210, cols: 2, spacing: 40 },
            { minWidth: 0, cols: 1, spacing: 30 },
          ]}
          className={classes.grid}
          cols={3}
          spacing={40}
        >
          {getSkeletons()}
        </SimpleGrid>
      </div>
    );
  }

  return (
    <Stack
      justify="space-between"
      p={30}
      style={{ width: "100%", height: "100%" }}
    >
      <div className={classes.content}>
        {filterRepositories.length === 0 ? (
          <Title align="center" order={4}>
            No repositories found
          </Title>
        ) : (
          <SimpleGrid
            breakpoints={[
              { minWidth: 1780, cols: 3, spacing: 40 },
              { minWidth: 1210, cols: 2, spacing: 40 },
              { minWidth: 0, cols: 1, spacing: 30 },
            ]}
            className={classes.grid}
            cols={3}
            spacing={40}
          >
            {getPaginationData(
              mapRepositories(repositories, visibility),
              activePage
            ).map((repo) => (
              <Card
                key={repo.name}
                language={repo.language}
                lastUpdated={repo.pushed_at}
                text={repo.description}
                title={repo.name}
                visibility={repo.visibility}
              />
            ))}
          </SimpleGrid>
        )}
      </div>
      <Group align="center" position="center">
        {repositories.length > 12 && (
          <Pagination
            page={activePage}
            total={getPagination(repositories.length)}
            onChange={setPage}
          />
        )}
      </Group>
    </Stack>
  );
}

export { Repositories };
