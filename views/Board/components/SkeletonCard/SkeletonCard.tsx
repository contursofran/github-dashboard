import { Badge, Card, Group, Skeleton, Text } from "@mantine/core";
import { useStyles } from "./SkeletonCard.styles";

function SkeletonCard() {
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      className={classes.root}
      mb={20}
      p="md"
      radius="md"
      shadow="md"
    >
      <Group align="center" mb="xs" position="apart" style={{ width: "330px" }}>
        <Group>
          <Group style={{ width: "250px" }}>
            <Skeleton width="50%">
              <Text size={"md"} weight={600}>
                {"title"}
              </Text>
            </Skeleton>
            <Skeleton width="25%">
              {"tag" && (
                <Badge color={"indigo"} variant="light">
                  <Text size="sm" weight={600}>
                    {"tag"}
                  </Text>
                </Badge>
              )}
            </Skeleton>
          </Group>
        </Group>
      </Group>
      <Skeleton height={49.6} mt={5}></Skeleton>
    </Card>
  );
}

export { SkeletonCard };
