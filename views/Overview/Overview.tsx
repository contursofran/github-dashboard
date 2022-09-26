import { Group } from "@mantine/core";
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
    <div className={classes.root}>
      <Group sx={{ height: "100%" }}>
        <Contributions username={username} />
        <Timeline username={username} />
      </Group>
    </div>
  );
}

export { Overview };
