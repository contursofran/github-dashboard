import {
  Card,
  ColorSwatch,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Type } from "@prisma/client";
import { Droppable } from "../../../../utils/dnd";
import { SkeletonCard } from "../../../Board/components/SkeletonCard";
import { BoardCard } from "../../types";
import { DraggableCard } from "../DraggableCard";
import { NewCard } from "../NewCard";
import { useStyles } from "./BoardColumn.styles";

interface Props {
  id: string;
  itemsList: BoardCard[];
  loading?: boolean;
  skeletons: string[];
  title: Type;
}

function BoardColumn({ id, itemsList, loading, skeletons, title }: Props) {
  const { classes } = useStyles();
  const { colors } = useMantineTheme();

  const counter = loading ? "?" : itemsList.length;

  return (
    <Card withBorder className={classes.root} p="lg" radius="md">
      <Group mb={"lg"} position="apart">
        <Group spacing="xs">
          <Title className={classes.title} order={4}>
            {title}
          </Title>
          <ColorSwatch color={colors.gray[7]}>{counter}</ColorSwatch>
        </Group>
      </Group>

      {loading ? (
        skeletons.map((item, index) => <SkeletonCard key={index} />)
      ) : (
        <Droppable droppableId={id}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {itemsList.map((item, index) => (
                <DraggableCard
                  cardId={item.id}
                  id={id}
                  index={index}
                  key={index.toString()}
                  tag={item.tag}
                  text={item.text}
                  title={item.title}
                  type={item.type}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
      {loading ? (
        <NewCard disabled cards={itemsList} type={title} />
      ) : (
        <NewCard cards={itemsList} type={title} />
      )}
    </Card>
  );
}

export { BoardColumn };
