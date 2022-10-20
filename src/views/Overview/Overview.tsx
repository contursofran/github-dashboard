import { Grid, SimpleGrid } from "@mantine/core";
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
        <Grid gutter={0} style={{ height: "100%" }}>
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
          <Grid.Col span={3}>
            <Timeline />
          </Grid.Col>
        </Grid>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid gutter={0} style={{ height: "100%" }}>
        <Grid.Col pr="2rem" span={9}>
          <Grid gutter={30} style={{ height: "100%" }}>
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
