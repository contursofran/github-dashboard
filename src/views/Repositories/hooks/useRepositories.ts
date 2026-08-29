import type { Endpoints } from "@octokit/types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { trpc } from "../../../utils/trpc";

export type UserRepositories = Endpoints["GET /user/repos"]["response"]["data"];
export type Visibility = "public" | "private" | "none";

function useRepositories(visibility: Visibility) {
  const user = useSession();
  const { data, status } = trpc.useQuery(["github.getRepositories"], {
    enabled: user.status === "authenticated",
  });

  useEffect(() => {
    if (visibility === "public") {
      window.localStorage.setItem("visibility", "public");
    } else if (visibility === "private") {
      window.localStorage.setItem("visibility", "private");
    }
  }, [visibility]);

  return {
    repositories: data ?? [],
    status,
  };
}

export { useRepositories };
