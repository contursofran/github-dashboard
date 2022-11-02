import { SimpleGrid, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { guestUser } from "../../utils/data";
import { RepositoriesSkeleton } from "./components/RepositoriesSkeleton/RepositoriesSkeleton";
import { Repository } from "./components/Repository";
import {
  filterRepositories,
  mapRepositories,
} from "./helpers/filterRepositories";
import { useRepositories, Visibility } from "./hooks/useRepositories";
import { useStyles } from "./Repositories.styles";

function Repositories({ visibility }: { visibility: Visibility }) {
  const { classes } = useStyles();
  const { repositories, status } = useRepositories(visibility);
  const user = useSession();

  if (user.status === "unauthenticated") {
    return (
      <div className={classes.content}>
        <SimpleGrid
          breakpoints={[
            { minWidth: 1780, cols: 3, spacing: 30 },
            { minWidth: 1210, cols: 2, spacing: 30 },
            { minWidth: 0, cols: 1 },
          ]}
          className={classes.grid}
          cols={3}
          spacing={30}
        >
          {guestUser.repositories.map(
            (repo) =>
              repo.visibility === visibility && (
                <Repository key={repo.name} {...repo} />
              )
          )}
        </SimpleGrid>
      </div>
    );
  }

  if (status === "loading" || repositories.length === 0) {
    return <RepositoriesSkeleton />;
  }

  return (
    <div className={classes.content}>
      {filterRepositories(repositories, visibility).length === 0 ? (
        <Title align="center" order={4}>
          No {visibility} repositories found
        </Title>
      ) : (
        <SimpleGrid
          breakpoints={[
            { minWidth: 1780, cols: 3, spacing: 30 },
            { minWidth: 1210, cols: 2, spacing: 30 },
            { minWidth: 0, cols: 1 },
          ]}
          className={classes.grid}
          cols={3}
          spacing={30}
        >
          {mapRepositories(repositories, visibility).map((repo) => (
            <Repository key={repo.name} {...repo} />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
}

export { Repositories };
