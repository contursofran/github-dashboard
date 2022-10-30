import { Grid, MediaQuery, SimpleGrid } from "@mantine/core";
import { useSession } from "next-auth/react";
import { Contributions, ContributionsGuest } from "./components/Contributions";
import { GithubStats } from "./components/GithubStats";
import { RepositoryStats } from "./components/RepositoryStats";
import { Timeline } from "./components/Timeline";
import { TopLanguages } from "./components/TopLanguages";

import { useStyles } from "./Overview.styles";

function Overview() {
  const { classes } = useStyles();
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className={classes.root} id="root">
        <Grid grow gutter={0} style={{ height: "100%" }}>
          <Grid.Col pr="2rem" span={9}>
            <div className={classes.grid}>
              <SimpleGrid cols={3} spacing={30}>
                <RepositoryStats />
              </SimpleGrid>
              <SimpleGrid cols={2} spacing={30}>
                <TopLanguages />
                <GithubStats />
              </SimpleGrid>
              <ContributionsGuest />
            </div>
          </Grid.Col>
          <MediaQuery query="(max-width: 1400px)" styles={{ display: "none" }}>
            <Grid.Col span={3}>
              <Timeline />
            </Grid.Col>
          </MediaQuery>
        </Grid>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid grow gutter={0} style={{ height: "100%" }}>
        <Grid.Col className={classes.col} span={9}>
          <div className={classes.grid}>
            <SimpleGrid cols={3} spacing={30}>
              <RepositoryStats />
            </SimpleGrid>
            <SimpleGrid cols={2} spacing={30}>
              <TopLanguages />
              <GithubStats />
            </SimpleGrid>
            <Contributions />
          </div>
        </Grid.Col>
        <MediaQuery query="(max-width: 1400px)" styles={{ display: "none" }}>
          <Grid.Col span={3}>
            <Timeline />
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </div>
  );
}

export { Overview };
