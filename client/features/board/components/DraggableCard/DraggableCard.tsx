import { Draggable } from "@hello-pangea/dnd";
import { Badge, Card, Group, Menu, Text } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { IconDots, IconEdit, IconPencil, IconTrash } from "@tabler/icons";
import { useStyles } from "./DraggableCard.styles";

export interface DraggableCardProps {
  id: string;
  index: number;
  tag: string;
  text: string;
  title: string;
}

function DraggableCard({ id, index, tag, text, title }: DraggableCardProps) {
  const { classes, cx } = useStyles();
  const [opened, handlers] = useDisclosure(false);
  const ref = useClickOutside(() => handlers.close());

  return (
    <Draggable
      draggableId={id + "-" + index.toString()}
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
            p="md"
            radius="md"
            shadow="md"
          >
            <Group align="center" mb="xs" position="apart">
              <Group>
                <Group>
                  <Text size={"md"} weight={600}>
                    {title}
                  </Text>
                  <Badge color="grape" variant="light">
                    <Text size="sm" weight={600}>
                      {tag}
                    </Text>
                  </Badge>
                </Group>
              </Group>
              <IconPencil color="gray" size={22} />
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
