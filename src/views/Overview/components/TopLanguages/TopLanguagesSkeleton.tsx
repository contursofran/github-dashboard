import { Card, SimpleGrid, Skeleton, Stack, Title } from "@mantine/core";
import { useStyles } from "./TopLanguages.styles";

function TopLanguagesSkeleton() {
  const { classes } = useStyles();

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Stack justify="space-between" sx={{ height: "100%" }}>
        <Title size={18}>Most used languages</Title>
        <Skeleton height={20} />
        <SimpleGrid cols={2}>
          <Skeleton height={20} width={"50%"} />
          <Skeleton height={20} width={"50%"} />
          <Skeleton height={20} width={"50%"} />
          <Skeleton height={20} width={"50%"} />
          <Skeleton height={20} width={"50%"} />
        </SimpleGrid>
      </Stack>
    </Card>
  );
}

export { TopLanguagesSkeleton };
