import { Group, Stack, Text, Title } from "@mantine/core";
import { Theme } from "./Theme";

export type Theme = "light" | "dark" | "system";

function Appearance() {
  return (
    <Stack style={{ height: "100%" }}>
      <Title size={17}>Appearence</Title>
      <Stack pt={10} spacing="xs">
        <Title size={15}>Theme</Title>
        <Text color="dimmed">Select theme</Text>
        <Group position="center" spacing={100}>
          <Theme theme="light" />
          <Theme theme="dark" />
          <Theme theme="system" />
        </Group>
      </Stack>
    </Stack>
  );
}

export { Appearance };
