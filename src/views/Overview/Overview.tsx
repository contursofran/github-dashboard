import { Grid, SimpleGrid } from "@mantine/core";
import { Contributions } from "./components/Contributions";
import { GithubStats } from "./components/GithubStats";
import { RepositoryStats } from "./components/RepositoryStats";
import { Timeline } from "./components/Timeline";
import { TopLanguages } from "./components/TopLanguages";

import { useStyles } from "./Overview.styles";

function Overview() {
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
              {<TopLanguages />}
            </Grid.Col>
            <Grid.Col pl={15} span={6}>
              {<GithubStats />}
            </Grid.Col>
            <Grid.Col>
              <Contributions />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={3}>
          <Timeline />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export { Overview };