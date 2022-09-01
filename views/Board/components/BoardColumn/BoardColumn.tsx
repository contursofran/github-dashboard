import {
  Card,
  ColorSwatch,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { Droppable } from "../../../../utils/dnd";
import { DraggableCard, DraggableCardProps } from "../DraggableCard";
import { NewCard } from "../NewCard";
import { useStyles } from "./BoardColumn.styles";

type List = Omit<DraggableCardProps, "index" | "id">[];

interface Props {
  id: string;
  itemsList: List;
  title: string;
}

function BoardColumn({ id, itemsList, title }: Props) {
  const { classes } = useStyles();
  const { colors } = useMantineTheme();

  const counter = itemsList.length;

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

      <Droppable droppableId={id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {itemsList.map((item, index) => (
              <DraggableCard
                id={id}
                index={index}
                key={index.toString()}
                tag={item.tag}
                text={item.text}
                title={item.title}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <NewCard />
    </Card>
  );
}

export { BoardColumn };
