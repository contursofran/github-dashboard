import { Badge, Card, Group, Skeleton, Text } from "@mantine/core";
import { useStyles } from "./SkeletonCard.styles";

function SkeletonCard() {
  const { classes } = useStyles();

  return (
    <Card
      withBorder
      className={classes.root}
      mb={20}
      ml={27}
      mr={20}
      p="md"
      radius="md"
      shadow="md"
    >
      <Group align="center" mb="xs" position="apart">
        <Group style={{ width: "100%" }}>
          <Group style={{ width: "100%" }}>
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
