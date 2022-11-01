import { Draggable } from "@hello-pangea/dnd";
import { Badge, Card, Group, Space, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { useState } from "react";
import { getTitleColor } from "../../../../utils/mantine";
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
  const { classes, cx, theme } = useStyles();
  const [editingCard, setEditingCard] = useState(false);

  const { description, draggableId, index, tag, title, type } = props;

  const getTagColor = () => {
    const tagColor = tags.find((t) => t.name === tag);
    return tagColor?.color;
  };

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
              {...props}
              newCard={false}
              setEditingCard={setEditingCard}
              tag={tag ? tag : undefined}
              text={description ? description : undefined}
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
                      color={getTitleColor(theme)}
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
                  className={classes.icon}
                  size={22}
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
