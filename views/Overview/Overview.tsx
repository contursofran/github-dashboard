import { Group, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useStore } from "../../store";
import { trpc } from "../../utils/trpc";
import { Contributions } from "./components/Contributions";
import { Stats } from "./components/Stats";
import { StatsCard } from "./components/StatsCard";
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
        <Group grow noWrap>
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </Group>
        <Group noWrap spacing={38}>
          <TopLanguages username={username} />
          <Stats username={username} />
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
