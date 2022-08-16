import { ActionIcon, Badge, Card, Group, Text } from "@mantine/core";
import { IconDots, IconEdit } from "@tabler/icons";
import { useStyles } from "./TaskCard.styles";

interface Props {
  title: string;
  text: string;
  tags: string[];
}

function TaskCard({ title, text, tags }: Props) {
  const { classes } = useStyles();

  return (
    <Card
      className={classes.root}
      shadow="md"
      mb="lg"
      mt="lg"
      p="lg"
      radius="md"
      withBorder
    >
      <Group mb="xs" position="apart">
        <Group>
          <Text size={"lg"}>{title}</Text>
        </Group>
        <IconDots />
      </Group>
      <Text size="md" color="dimmed">
        {text}
      </Text>
      <Group pt={"md"}>
        {tags.map((tag, index) => (
          <Badge color="grape" variant="light" key={index}>
            {tag}
          </Badge>
        ))}
      </Group>
    </Card>
  );
}

export { TaskCard };
