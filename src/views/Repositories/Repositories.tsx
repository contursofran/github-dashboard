import { Paper, SimpleGrid, Skeleton } from "@mantine/core";
import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { Card } from "./components/Card";
import { useStyles } from "./Repositories.styles";

type ListUserRepos = Endpoints["GET /user/repos"]["response"]["data"];

const MAX_REPOS_PER_PAGE = 9;

function Repositories() {
  const { classes } = useStyles();
  const [repos, setRepos] = useState<ListUserRepos>([]);
  const { data: token, status } = trpc.useQuery(["auth.getToken"]);

  useEffect(() => {
    const fetchRepositories = async (accessToken: string | null) => {
      const octokit = new Octokit({ auth: accessToken });
      const repositories = await octokit
        .request("GET /user/repos", {})
        .then((res) => res.data)
        .catch((err) => console.log(err));

      if (repositories) {
        setRepos(repositories);
      }
    };

    if (status === "success" && token) {
      fetchRepositories(token.access_token);
    }
  }, [status, token]);

  const reposWithLastUpdated = repos.map((repo) => {
    if (repo.pushed_at === null && repo.created_at === null) {
      return { ...repo, pushed_at: repo.created_at };
    }
    return repo;
  });

  const sortedRepos = reposWithLastUpdated.sort((a, b) => {
    if (a.pushed_at !== null && b.pushed_at !== null) {
      if (a.pushed_at < b.pushed_at) {
        return 1;
      }
      if (a.pushed_at > b.pushed_at) {
        return -1;
      }
    }
    return 0;
  });

  const mapRepositories = (repos: ListUserRepos) => {
    return repos.map((repo) => {
      return {
        name: repo.name,
        description: repo.description,
        language: repo.language,
        pushed_at: repo.pushed_at,
        visibility: repo.private ? "Private" : "Public",
      };
    });
  };

  const returnSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < MAX_REPOS_PER_PAGE; i++) {
      skeletons.push(<Card key={i} skeleton={true} />);
    }

    return skeletons;
  };

  if (status === "loading" || repos.length === 0) {
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
          {returnSkeletons()}
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
        {sortedRepos.length > 0 &&
          mapRepositories(sortedRepos).map((repo) => (
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
