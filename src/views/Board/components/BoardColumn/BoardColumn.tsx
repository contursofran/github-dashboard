import {
  ColorSwatch,
  Group,
  Paper,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { Type } from "@prisma/client";
import { Droppable } from "../../../../utils/dnd";
import { getTitleColor } from "../../../../utils/mantine";
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
  const { classes, theme } = useStyles();

  const counter = loading ? "?" : itemsList.length;

  return (
    <Paper withBorder className={classes.root} radius="md">
      <Group p={20} position="apart">
        <Group spacing="xs">
          <Title
            className={classes.title}
            color={getTitleColor(theme)}
            order={4}
          >
            {title}
          </Title>
          <ColorSwatch
            color={
              theme.colorScheme === "dark"
                ? theme.colors.gray[7]
                : theme.colors.gray[1]
            }
          >
            {<Text color={getTitleColor(theme)}>{counter}</Text>}
          </ColorSwatch>
        </Group>
      </Group>

      <ScrollArea
        classNames={{
          thumb: classes.scrollBarThumb,
          scrollbar: classes.scrollBar,
        }}
        scrollHideDelay={500}
        style={{ height: "calc(100vh - 200px)", marginRight: 6 }}
      >
        {loading ? (
          skeletons.map((item, index) => <SkeletonCard key={index} />)
        ) : (
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                style={{ paddingLeft: 25, paddingRight: 17, minHeight: 5 }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {itemsList.map((item, index) => (
                  <DraggableCard
                    description={item.description}
                    draggableId={id}
                    id={item.id}
                    index={index}
                    key={index.toString()}
                    tag={item.tag}
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
      </ScrollArea>
    </Paper>
  );
}

export { BoardColumn };
