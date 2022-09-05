import { Group, Text, useMantineTheme } from "@mantine/core";
import { Type } from "@prisma/client";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import { EditableCard } from "./EditableCard";

function NewCard({ type }: { type: Type }) {
  const [editingCard, setEditingCard] = useState(false);
  const { spacing } = useMantineTheme();

  return (
    <>
      {editingCard ? (
        <EditableCard newCard setEditingCard={setEditingCard} type={type} />
      ) : (
        <Group
          align="center"
          position="center"
          spacing="xs"
          style={{ cursor: "pointer" }}
          onClick={() => setEditingCard(true)}
        >
          <IconPlus size={spacing.lg} />
          <Text color="gray.5" size="md">
            Add new
          </Text>
        </Group>
      )}
    </>
  );
}

export { NewCard };
