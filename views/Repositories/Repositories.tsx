import { SimpleGrid } from "@mantine/core";
import { Card } from "./components/Card";
import { SkeletonCard } from "./components/SkeletonCard";
import { useRepositories } from "./hooks/useRepositories";
import { useStyles } from "./Repositories.styles";

const MAX_REPOS_PER_PAGE = 9;

function Repositories() {
  const { classes } = useStyles();
  const { mapRepositories, repositories, sortRepositories, status } =
    useRepositories();

  const getSkeletons = () => {
    const skeletons = [];

    for (let i = 0; i < MAX_REPOS_PER_PAGE; i++) {
      skeletons.push(<SkeletonCard key={i} />);
    }

    return skeletons;
  };

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
        >
          {getSkeletons()}
        </SimpleGrid>
      </div>
    );
  }

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
      >
        {sortRepositories.length > 0 &&
          mapRepositories(sortRepositories).map((repo) => (
            <Card
              badge={repo.visibility}
              key={repo.name}
              language={repo.language}
              lastUpdated={repo.pushed_at}
              text={repo.description}
              title={repo.name}
            />
          ))}
      </SimpleGrid>
    </div>
  );
}

export { Repositories };
