import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { AccentColor } from "./components/AccentColor";
import { Theme } from "./components/Theme";
import { useStyles } from "./Settings.styles";

function Settings() {
  const { classes } = useStyles();

  return (
    <>
      <Card withBorder className={classes.card} p="lg" pb={40} radius="md">
        <Stack spacing="xs">
          <Title size={17}>Theme</Title>
          <Text color="dimmed">Choose your theme</Text>
          <Group position="center" pt={"lg"} spacing={100}>
            <Stack>
              <Theme theme="light" />
              <Text>Light</Text>
            </Stack>
            <Stack>
              <Theme theme="dark" />
              <Text>Dark</Text>
            </Stack>
            <Stack>
              <Theme theme="system" />
              <Text>Auto</Text>
            </Stack>
          </Group>
        </Stack>
        <Stack pt={30} spacing="xs">
          <Title pt={10} size={17}>
            Accent Color
          </Title>
          <Text color="dimmed">Choose your accent color</Text>
          <AccentColor />
        </Stack>
      </Card>
    </>
  );
}

export { Settings };
