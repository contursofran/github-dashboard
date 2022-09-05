import { Draggable } from "@hello-pangea/dnd";
import { Badge, Card, Group, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { useState } from "react";
import { List } from "../../types";
import { EditableCard } from "../EditableCard";
import { useStyles } from "./DraggableCard.styles";

export interface DraggableCardProps extends List {
  index: number;
}

function DraggableCard({
  id,
  index,
  tag,
  text,
  title,
  type,
}: DraggableCardProps) {
  const { classes, cx } = useStyles();
  const [editingCard, setEditingCard] = useState(false);

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
          {editingCard ? (
            <EditableCard
              newCard={false}
              setEditingCard={setEditingCard}
              tag={tag}
              text={text}
              title={title}
              type={type}
            />
          ) : (
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
                <IconPencil
                  size={22}
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditingCard(true)}
                />
              </Group>
              <Text color="dimmed" size="md">
                {text}
              </Text>
            </Card>
          )}
        </div>
      )}
    </Draggable>
  );
}

export { DraggableCard };
