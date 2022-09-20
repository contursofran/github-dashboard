import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import { useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";

type UserEvents = Endpoints["GET /users/{username}/events"]["response"]["data"];

interface GetUserEventsProps {
  octokit: Octokit;
  username: string;
}

function useGetUserEvents() {
  const [userEvents, setUserEvents] = useState<UserEvents>();
  const { data, status } = trpc.useQuery(["auth.getToken"]);

  const token = data?.accounts[0].access_token;

  useEffect(() => {
    const getUserEvents = async ({ octokit, username }: GetUserEventsProps) => {
      const { data } = await octokit.request("GET /users/{username}/events", {
        username,
      });

      setUserEvents(data);
    };

    const getUser = async (octokit: Octokit) => {
      const user = await octokit
        .request("GET /user")
        .then((res) => res.data)
        .catch((err) => console.log(err));

      if (user) {
        getUserEvents({ username: user.login, octokit });
      }
    };

    if (status === "success" && token) {
      const octokit = new Octokit({ auth: token });

      getUser(octokit);
    }
  }, [token, status]);

  return { userEvents };
}

export { useGetUserEvents };
