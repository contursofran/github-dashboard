import {
  Card,
  Container,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core";
import { useStyles } from "./GithubStats.styles";

function GithubStatsSkeleton() {
  const { classes } = useStyles();
  return (
    <Card
      withBorder
      className={classes.card}
      p="lg"
      radius="md"
      style={{ height: "100%" }}
    >
      <Stack sx={{ height: "100%" }}>
        <Group>
          <Stack justify="space-between" sx={{ width: "55%" }}>
            <Title size={18}>Github Stats</Title>
            <SimpleGrid cols={1} spacing="xs">
              <Skeleton height={16} width={"90%"} />
              <Skeleton height={16} width={"90%"} />
              <Skeleton height={16} width={"90%"} />
              <Skeleton height={16} width={"90%"} />
              <Skeleton height={16} width={"90%"} />
            </SimpleGrid>
          </Stack>
          <Container>
            <Skeleton circle height={100} mr={"xl"} />
          </Container>
        </Group>
      </Stack>
    </Card>
  );
}

export { GithubStatsSkeleton };
