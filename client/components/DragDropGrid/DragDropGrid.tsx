import {
  Card,
  ColorSwatch,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";
import { DragDropContext, Droppable } from "../../utils/dnd";

import { IconPlus } from "@tabler/icons";
import { DraggableCardProps } from "../DraggableCard";
import { useStyles } from "./DragDropGrid.styles";

interface Props {
  children: React.ReactNode;
  counter: number;
  listHandler: UseListStateHandlers<Omit<DraggableCardProps, "index">>;
  title: string;
}

function DragDropGrid({ children, counter, listHandler, title }: Props) {
  const { classes } = useStyles();
  const { colors, spacing } = useMantineTheme();

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Group mb={"lg"} position="apart">
        <Group spacing="xs">
          <Title className={classes.title} order={4}>
            {title}
          </Title>
          <ColorSwatch color={colors.gray[7]}>{counter}</ColorSwatch>
        </Group>
        <Group spacing="xs">
          <IconPlus size={spacing.lg} />
          <Title order={4}>Add new</Title>
        </Group>
      </Group>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          listHandler.reorder({
            from: source.index,
            to: destination?.index || 0,
          })
        }
      >
        <Droppable direction="vertical" droppableId="dnd-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {children}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
}

export { DragDropGrid };
