import { Badge, Card, Group, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons";
import { useStyles } from "./DraggableCard.styles";

export interface DraggableCardProps {
  tags: string[];
  text: string;
  title: string;
}

function DraggableCard({ tags, text, title }: DraggableCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder className={classes.root} p="md" radius="md" shadow="md">
      <Group mb="xs" position="apart">
        <Group>
          <Text size={"lg"}>{title}</Text>
        </Group>
        <IconDots />
      </Group>
      <Text color="dimmed" size="md">
        {text}
      </Text>
      <Group pt={"md"}>
        {tags.map((tag, index) => (
          <Badge color="grape" key={index} variant="light">
            {tag}
          </Badge>
        ))}
      </Group>
    </Card>
  );
}

export { DraggableCard };
