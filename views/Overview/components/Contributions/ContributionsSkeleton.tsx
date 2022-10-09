import { Card, Group, Skeleton, Stack } from "@mantine/core";
import { useStyles } from "./Contributions.styles";

function ContributionsSkeleton() {
  const { classes } = useStyles();

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Skeleton sx={{ height: 20, width: 200 }} />
      <Group pt={"2%"} sx={{ height: "75%", width: "100%" }}>
        <Stack justify="center" pt={"3%"} sx={{ height: "100%", width: "5%" }}>
          <Skeleton height={20} width={"100%"} />
          <Skeleton height={20} width={"100%"} />
          <Skeleton height={20} width={"100%"} />
        </Stack>
        <Stack sx={{ height: "100%", width: "93%" }}>
          <Skeleton height={25} width={"100%"} />
          <Skeleton height={"100%"} width={"100%"} />
        </Stack>
        <Skeleton
          sx={{
            height: 20,
            width: 200,
            position: "absolute",
            right: "2.3%",
            bottom: "7%",
          }}
        />
      </Group>
    </Card>
  );
}

export { ContributionsSkeleton };
