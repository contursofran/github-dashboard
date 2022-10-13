import { UserRepositories } from "../hooks/useRepositories";

const repositoriesWithPushedAt = (repositories: UserRepositories) => {
  return repositories.map((repo) => {
    if (!repo.pushed_at && !repo.updated_at) {
      return {
        ...repo,
        pushed_at: repo.created_at,
      };
    }
    return repo;
  });
};

const sortRepositories = (repositories: UserRepositories) => {
  return repositoriesWithPushedAt(repositories).sort((a, b) => {
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
};

export const filterRepositories = (
  repositories: UserRepositories,
  visibility: string
) => {
  return sortRepositories(repositories).filter((repo) => {
    if (visibility === "public") {
      return repo.visibility === "public";
    }
    if (visibility === "private") {
      return repo.visibility === "private";
    }
    return repo;
  });
};

export const mapRepositories = (
  repositories: UserRepositories,
  visibility: string
) => {
  return filterRepositories(repositories, visibility).map((repo) => {
    return {
      name: repo.name,
      description: repo.description,
      language: repo.language,
      pushed_at: repo.pushed_at,
      visibility: repo.private ? "Private" : "Public",
    };
  });
};

export type MappedRepositories = ReturnType<typeof mapRepositories>;
