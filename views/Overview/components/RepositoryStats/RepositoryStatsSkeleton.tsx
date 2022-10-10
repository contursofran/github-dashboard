import { Card, Skeleton, Stack, Title } from "@mantine/core";
import { useStyles } from "./RepositoryStats.styles";

function RepositoryStatsSkeleton() {
  const { classes } = useStyles();

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Title pb={5} size={18}>
        Stats
      </Title>
      <Skeleton height={20} width={"45%"} />
      <Stack pt={"md"}>
        <Skeleton height={45} width={"100%"} />
        <Skeleton height={45} width={"100%"} />
        <Skeleton height={45} width={"100%"} />
      </Stack>
    </Card>
  );
}

export { RepositoryStatsSkeleton };
