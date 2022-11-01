import { Group, MantineTheme, Text, useMantineTheme } from "@mantine/core";
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

const getColor = (theme: MantineTheme, disabled?: boolean) => {
  if (disabled && theme.colorScheme === "dark") {
    return theme.colors.gray[7];
  } else if (disabled && theme.colorScheme === "light") {
    return "white";
  } else if (theme.colorScheme === "dark") {
    return theme.colors.gray[5];
  } else {
    return theme.colors.gray[4];
  }
};

function NewCard({ cards, disabled, type }: Props) {
  const [editingCard, setEditingCard] = useState(false);
  const theme = useMantineTheme();

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
          pb={20}
          position="center"
          spacing="xs"
          style={disabled ? { cursor: "not-allowed" } : { cursor: "pointer" }}
          onClick={() => setEditingCard(true)}
        >
          <IconPlus color={getColor(theme, disabled)} size={theme.spacing.lg} />
          <Text color={getColor(theme, disabled)} size="md">
            Add new
          </Text>
        </Group>
      )}
    </>
  );
}

export { NewCard };
