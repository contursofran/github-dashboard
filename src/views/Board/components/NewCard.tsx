import { Group, Text, useMantineTheme } from "@mantine/core";
import { Type } from "@prisma/client";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import { BoardCard } from "../types";
import { EditableCard } from "./EditableCard";

interface Props {
  cards: BoardCard[];
  disabled?: boolean;
  type: Type;
}
function NewCard({ cards, disabled, type }: Props) {
  const [editingCard, setEditingCard] = useState(false);
  const { spacing } = useMantineTheme();

  const index = cards.length;
  return (
    <>
      {editingCard ? (
        <EditableCard
          newCard
          id={index.toString()}
          index={index}
          setEditingCard={setEditingCard}
          type={type}
        />
      ) : (
        <Group
          align="center"
          position="center"
          spacing="xs"
          style={disabled ? { cursor: "not-allowed" } : { cursor: "pointer" }}
          onClick={() => setEditingCard(true)}
        >
          <IconPlus color={disabled ? "gray" : "white"} size={spacing.lg} />
          <Text color={disabled ? "gray.7" : "gray.5"} size="md">
            Add new
          </Text>
        </Group>
      )}
    </>
  );
}

export { NewCard };
