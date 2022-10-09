import { Paper, Skeleton, Stack, Title } from "@mantine/core";
import { useStyles } from "./Timeline.styles";
function TimelineSkeleton() {
  const { classes } = useStyles();
  const skeletonItems = Array.from(Array(5).keys());

  return (
    <Paper withBorder className={classes.card} p="lg" radius="md">
      <Stack sx={{ height: "100%" }}>
        <Title size={18}>Last activity</Title>
        {skeletonItems.map((item) => (
          <Stack className={classes.container} key={item}>
            <Skeleton height="20px" width="35%" />
            <Skeleton height="20px" width="100%" />
            <Skeleton height="20px" width="100%" />
            <Skeleton height="20px" mb={8} width="30%" />
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

export { TimelineSkeleton };
