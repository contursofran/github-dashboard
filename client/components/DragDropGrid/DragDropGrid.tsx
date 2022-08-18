import {
  Card,
  ColorSwatch,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { List } from "../../types/base";
import { Droppable } from "../../utils/dnd";
import { useStyles } from "./DragDropGrid.styles";
import { DraggableCard } from "./DraggableCard";

interface Props {
  id: string;
  itemsList: List;
  title: string;
}

function DragDropGrid({ id, itemsList, title }: Props) {
  const { classes } = useStyles();
  const { colors, spacing } = useMantineTheme();

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
        <Group spacing="xs">
          <IconPlus size={spacing.lg} />
          <Title order={4}>Add new</Title>
        </Group>
      </Group>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            style={{ height: "100%" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
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
    </Card>
  );
}

export { DragDropGrid };
