import { Draggable } from "@hello-pangea/dnd";
import { Badge, Card, Group, Space, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { useState } from "react";
import { BoardCard } from "../../types";
import { EditableCard } from "../EditableCard";
import { useStyles } from "./DraggableCard.styles";

export interface DraggableCardProps extends BoardCard {
  draggableId: string;
  index: number;
}

const tags = [
  {
    name: "HIGH",
    color: "red",
  },
  {
    name: "MEDIUM",
    color: "yellow",
  },
  {
    name: "LOW",
    color: "green",
  },
];

function DraggableCard(props: DraggableCardProps) {
  const { classes, cx } = useStyles();
  const [editingCard, setEditingCard] = useState(false);
  const getTagColor = () => {
    const tagColor = tags.find((t) => t.name === tag);
    return tagColor?.color;
  };

  const { description, draggableId, id, index, tag, title, type } = props;

  console.log(props);

  return (
    <Draggable
      draggableId={draggableId + "-" + index.toString()}
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
              id={id}
              index={index}
              newCard={false}
              setEditingCard={setEditingCard}
              tag={tag ? tag : undefined}
              text={description ? description : undefined}
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
                    <Text
                      size={"md"}
                      style={
                        type === "Done"
                          ? { textDecoration: "line-through" }
                          : {}
                      }
                      weight={600}
                    >
                      {title}
                    </Text>
                    {tag && (
                      <Badge
                        color={getTagColor() ? getTagColor() : "indigo"}
                        variant="light"
                      >
                        <Text
                          size="sm"
                          style={
                            type === "Done"
                              ? { textDecoration: "line-through" }
                              : {}
                          }
                          weight={600}
                        >
                          {tag}
                        </Text>
                      </Badge>
                    )}
                  </Group>
                </Group>
                <IconPencil
                  size={22}
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditingCard(true)}
                />
              </Group>
              {description ? (
                <Text
                  color="dimmed"
                  size="md"
                  style={
                    type === "Done" ? { textDecoration: "line-through" } : {}
                  }
                >
                  {description}
                </Text>
              ) : (
                <Space mt={-9} />
              )}
            </Card>
          )}
        </div>
      )}
    </Draggable>
  );
}

export { DraggableCard };
