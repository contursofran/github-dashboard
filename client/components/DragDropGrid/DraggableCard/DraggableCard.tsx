import { Draggable } from "@hello-pangea/dnd";
import { Badge, Card, Group, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons";
import { useStyles } from "./DraggableCard.styles";

export interface DraggableCardProps {
  id?: string;
  index?: number;
  tag: string;
  text: string;
  title: string;
}

function DraggableCard({
  id = "0",
  index = 0,
  tag,
  text,
  title,
}: DraggableCardProps) {
  const { classes, cx } = useStyles();

  return (
    <Draggable
      draggableId={id + "-" + index}
      index={index}
      key={index.toString()}
    >
      {(provided, snapshot) => (
        <div
          className={cx(classes.card, {
            [classes.cardDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card
            withBorder
            className={classes.root}
            mt="md"
            p="md"
            radius="md"
            shadow="md"
          >
            <Group mb="xs" position="apart">
              <Group>
                <Group>
                  <Text size={"md"} weight={600}>
                    {title}
                  </Text>
                  <Badge color="grape" variant="light">
                    {tag}
                  </Badge>
                </Group>
              </Group>
              <IconDots />
            </Group>
            <Text color="dimmed" size="md">
              {text}
            </Text>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export { DraggableCard };
