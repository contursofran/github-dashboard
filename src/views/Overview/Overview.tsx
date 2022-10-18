import { Grid, ScrollArea, SimpleGrid } from "@mantine/core";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Contributions, ContributionsGuest } from "./components/Contributions";
import { GithubStats } from "./components/GithubStats";
import { RepositoryStats } from "./components/RepositoryStats";
import { Timeline } from "./components/Timeline";
import { TopLanguages } from "./components/TopLanguages";

import { useStyles } from "./Overview.styles";

function Overview() {
  const { classes } = useStyles();
  const { status } = useSession();
  const { height } = useViewportSize();
  const [scrollerHeight, setScrollerHeight] = useState(1080);
  const isSmallScreen = useMediaQuery("(max-Height: 950px)");

  useEffect(() => {
    if (height) {
      setScrollerHeight(height - 140);
    }
  }, [height]);

  if (status === "unauthenticated") {
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
                <ContributionsGuest />
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

  return (
    <>
      {isSmallScreen ? (
        <ScrollArea
          classNames={{
            scrollbar: classes.scrollBar,
            thumb: classes.scrollBarThumb,
          }}
          style={{
            height: scrollerHeight,
          }}
          type="always"
        >
          <Grid gutter={0} p={20}>
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
        </ScrollArea>
      ) : (
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
      )}
    </>
  );
}

export { Overview };
