import { Paper } from "@mantine/core";
import { useEffect } from "react";
import { useStore } from "../../store";
import { trpc } from "../../utils/trpc";

import { useStyles } from "./Overview.styles";

function Overview() {
  const { data: username } = trpc.useQuery(["github.getUsername"]);
  const { data: contributions } = trpc.useQuery(
    ["github.getUserContributions", { username }],
    { enabled: !!username }
  );
  const { data: events } = trpc.useQuery(
    ["github.getUserEvents", { username }],
    { enabled: !!username }
  );

  console.log(contributions);

  const { classes } = useStyles();

  useEffect(() => {
    useStore.setState({ currentPage: "Overview" });
  }, []);

  return (
    <>
      <Paper withBorder className={classes.card} style={{}}></Paper>
    </>
  );
}

export { Overview };
