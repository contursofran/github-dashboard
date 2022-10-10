import { Grid, SimpleGrid } from "@mantine/core";
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

  return (
    <div className={classes.root}>
      <Grid gutter={0} style={{ height: "100%" }}>
        <Grid.Col pr="2rem" span={9}>
          <Grid gutter={0} style={{ height: "100%" }}>
            <Grid.Col>
              <SimpleGrid cols={3} spacing={30}>
                <RepositoryStats />
              </SimpleGrid>
            </Grid.Col>
            <Grid.Col pr={15} span={6}>
              {<TopLanguages username={username} />}
            </Grid.Col>
            <Grid.Col pl={15} span={6}>
              {<GithubStats username={username} />}
            </Grid.Col>
            <Grid.Col>
              <Contributions username={username} />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={3}>
          <Timeline username={username} />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export { Overview };
