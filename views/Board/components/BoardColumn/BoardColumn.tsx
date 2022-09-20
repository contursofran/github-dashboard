import {
  ColorSwatch,
  Group,
  Paper,
  ScrollArea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { Type } from "@prisma/client";
import { useEffect, useState } from "react";
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
  const { height, ref } = useElementSize();
  const [scrollHeight, setScrollHeight] = useState(700);

  const counter = loading ? "?" : itemsList.length;
  useEffect(() => {
    setScrollHeight(height - 100);
  }, [height]);

  return (
    <Paper withBorder className={classes.root} radius="md" ref={ref}>
      <Group p={20} position="apart">
        <Group spacing="xs">
          <Title className={classes.title} order={4}>
            {title}
          </Title>
          <ColorSwatch color={colors.gray[7]}>{counter}</ColorSwatch>
        </Group>
      </Group>

      <ScrollArea
        classNames={{
          thumb: classes.scrollBarThumb,
          scrollbar: classes.scrollBar,
        }}
        scrollHideDelay={500}
        style={{ height: scrollHeight, marginRight: 6 }}
      >
        {loading ? (
          skeletons.map((item, index) => <SkeletonCard key={index} />)
        ) : (
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                style={{ paddingLeft: 25, paddingRight: 17 }}
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
