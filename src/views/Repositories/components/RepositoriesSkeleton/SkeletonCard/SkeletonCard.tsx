import {
  Card as MantineCard,
  ColorSwatch,
  Group,
  Skeleton,
  Text,
} from "@mantine/core";
import { useStyles } from "./SkeletonCard.styles";

function SkeletonCard() {
  const { classes } = useStyles();

  return (
    <MantineCard className={classes.root} p="lg" radius="md" shadow="md">
      <Group mb="sm">
        <Skeleton width={"50%"}>
          <Text color="blue.4" size={"lg"}>
            {"text"}
          </Text>
        </Skeleton>
      </Group>
      <Skeleton>
        <Text className={classes.text} color="dimmed" size="md">
          {"No description"}
        </Text>
      </Skeleton>
      <Group position="apart" pt={"md"}>
        <Skeleton width="30%">
          <Group align="center" position="center">
            <ColorSwatch className={classes.swatch} color={"red"} />
            <Text color="dimmed" size="sm">
              {"language"}
            </Text>
          </Group>
        </Skeleton>
        <Skeleton height={24.8} width="45%" />
      </Group>
    </MantineCard>
  );
}

export { SkeletonCard };
