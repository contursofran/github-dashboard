import { Card, Grid, SimpleGrid } from "@mantine/core";
import { trpc } from "../../../../utils/trpc";
import { useStyles } from "./Contributions.styles";

function Contributions({ username }: { username: string | undefined }) {
  const { classes } = useStyles();
  // const { data: contributions } = trpc.useQuery(
  //   ["github.getUserContributions", { username }],
  //   { enabled: !!username }
  // );
  const WEEKS = 52;
  const DAYS = 7;

  const items = Array.from(Array(WEEKS * DAYS).keys());

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Grid className={classes.grid}>
        {/* {totalWeeks.map((week, index) => ( */}
        <>
          {items.map((week, index) => (
            <div className={classes.gridItem} key={index}>
              {}
            </div>
          ))}
        </>
        {/* ))} */}
      </Grid>
    </Card>
  );
}

export { Contributions };
