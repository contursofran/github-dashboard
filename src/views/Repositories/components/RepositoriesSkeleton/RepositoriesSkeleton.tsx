import { SimpleGrid } from "@mantine/core";
import { MAX_REPOS_PER_PAGE } from "../../helpers/pagination";
import { useStyles } from "../../Repositories.styles";
import { SkeletonCard } from "./SkeletonCard";

function RepositoriesSkeleton() {
  const { classes } = useStyles();

  const getSkeletons = () => {
    const skeletons = [];

    for (let i = 0; i < MAX_REPOS_PER_PAGE - 1; i++) {
      skeletons.push(<SkeletonCard key={i} />);
    }

    return skeletons;
  };

  return (
    <div style={{ padding: 30, height: "100%", width: "100%" }}>
      <div className={classes.content}>
        <SimpleGrid
          breakpoints={[
            { minWidth: 1780, cols: 3, spacing: 40 },
            { minWidth: 1210, cols: 2, spacing: 30 },
            { minWidth: 0, cols: 1, spacing: 30 },
          ]}
          className={classes.grid}
          cols={3}
          spacing={40}
        >
          {getSkeletons()}
        </SimpleGrid>
      </div>
    </div>
  );
}

export { RepositoriesSkeleton };
