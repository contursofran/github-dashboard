import { Card, Skeleton, Stack } from "@mantine/core";
import { useStyles } from "./RepositoryStats.styles";

function RepositoryStatsSkeleton() {
  const { classes } = useStyles();

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Stack>
        <Skeleton height={20} width={"20%"} />
        <Skeleton height={20} width={"45%"} />
      </Stack>
      <Stack pt={"md"}>
        <Skeleton height={45} width={"100%"} />
        <Skeleton height={45} width={"100%"} />
        <Skeleton height={45} width={"100%"} />
      </Stack>
    </Card>
  );
}

export { RepositoryStatsSkeleton };
