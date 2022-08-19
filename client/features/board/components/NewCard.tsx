import { Group, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons";
import { EditCard } from "./EditCard/EditCard";

function NewCard() {
  const [opened, handlers] = useDisclosure(false);
  const { spacing } = useMantineTheme();

  return (
    <>
      {opened ? (
        <EditCard />
      ) : (
        <Group
          align="center"
          position="center"
          spacing="xs"
          onClick={handlers.open}
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
