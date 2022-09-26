import { useEffect } from "react";
import { useStore } from "../../store";
import { trpc } from "../../utils/trpc";
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
      <Timeline username={username} />
    </div>
  );
}

export { Overview };
