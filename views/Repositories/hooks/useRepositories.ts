import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import { useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";

export type UserRepositories = Endpoints["GET /user/repos"]["response"]["data"];
export type Visibility = "public" | "private" | "none";

function useRepositories(visibility: Visibility) {
  const [repositories, setRepositories] = useState<UserRepositories>([]);
  const { data, status } = trpc.useQuery(["auth.getToken"]);
  const token = data?.accounts[0].access_token;

  useEffect(() => {
    if (visibility === "public") {
      window.localStorage.setItem("visibility", "public");
    } else if (visibility === "private") {
      window.localStorage.setItem("visibility", "private");
    }
  }, [visibility]);

  useEffect(() => {
    if (token) {
      const fetchRepositories = async (accessToken: string | null) => {
        const octokit = new Octokit({ auth: accessToken });
        const repositories = await octokit
          .request("GET /user/repos", {})
          .then((res) => res.data)
          .catch((err) => console.log(err));

        if (repositories) {
          setRepositories(repositories);
        }
      };

      if (status === "success" && token) {
        fetchRepositories(token);
      }
    }
  }, [status, token]);

  return {
    repositories,
    status,
  };
}

export { useRepositories };
