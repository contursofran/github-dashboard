import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import { useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";

type UserRepositories = Endpoints["GET /user/repos"]["response"]["data"];

function useRepositories() {
  const [repositories, setRepositories] = useState<UserRepositories>([]);
  const { data: token, status } = trpc.useQuery(["auth.getToken"]);

  useEffect(() => {
    const fetchRepositories = async (accessToken: string | null) => {
      const octokit = new Octokit({ auth: accessToken });
      const repositories = await octokit
        .request("GET /user/repos", {})
        .then((res) => res.data)
        .catch((err) => console.log(err));

      if (repositories) {
        1;
        setRepositories(repositories);
      }
    };

    if (status === "success" && token) {
      fetchRepositories(token.access_token);
    }
  }, [status, token]);

  const repositoriesWithPushedAt = repositories.map((repo) => {
    if (!repo.pushed_at && !repo.updated_at) {
      return {
        ...repo,
        pushed_at: repo.created_at,
      };
    }
    return repo;
  });

  const sortRepositories = repositoriesWithPushedAt.sort((a, b) => {
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

  const mapRepositories = (repos: UserRepositories) => {
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

  return {
    repositories,
    sortRepositories,
    mapRepositories,
    status,
  };
}

export { useRepositories };
