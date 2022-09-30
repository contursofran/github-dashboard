import { Group, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useStore } from "../../store";
import { trpc } from "../../utils/trpc";
import { Contributions } from "./components/Contributions";
import { Timeline } from "./components/Timeline";

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
        <Contributions username={username} />
      </Stack>
      <div className={classes.timeline}>
        <Timeline username={username} />
      </div>
    </Group>
  );
}

export { Overview };
