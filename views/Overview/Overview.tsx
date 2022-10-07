import { Group, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useStore } from "../../store";
import { trpc } from "../../utils/trpc";
import { Contributions } from "./components/Contributions";
import { GithubStats } from "./components/GithubStats";
import { RepositoryStats } from "./components/RepositoryStats";
import { Timeline } from "./components/Timeline";
import { TopLanguages } from "./components/TopLanguages";

import { useStyles } from "./Overview.styles";

function Overview() {
  const { data: username } = trpc.useQuery(["github.getUsername"]);
  const { classes } = useStyles();

  useEffect(() => {
    useStore.setState({ currentPage: "Overview" });
  }, []);

  return (
    <Group className={classes.flex} p="2rem" position="apart">
      <Stack className={classes.container}>
        <Group noWrap spacing={40} style={{ height: "100%" }}>
          <RepositoryStats />
        </Group>
        <Group grow noWrap spacing={38}>
          <TopLanguages username={username} />
          <GithubStats username={username} />
        </Group>
        <Contributions username={username} />
      </Stack>
      <div className={classes.timeline}>
        <Timeline username={username} />
      </div>
    </Group>
  );
}

export { Overview };
