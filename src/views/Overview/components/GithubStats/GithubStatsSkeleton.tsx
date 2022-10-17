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
      style={{ height: "200px" }}
    >
      <Stack sx={{ height: "100%" }}>
        <Group>
          <Stack justify="space-between" sx={{ width: "58%" }}>
            <Title size={18}>Github Stats</Title>
            <SimpleGrid cols={1} spacing="xs">
              <Skeleton height={16} width={"65%"} />
              <Skeleton height={16} width={"65%"} />
              <Skeleton height={16} width={"65%"} />
              <Skeleton height={16} width={"65%"} />
              <Skeleton height={16} width={"65%"} />
            </SimpleGrid>
          </Stack>
          <Container>
            <Skeleton circle height={111} />
          </Container>
        </Group>
      </Stack>
    </Card>
  );
}

export { GithubStatsSkeleton };
