import { ColorSwatch, Group, useMantineTheme } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import { useStore } from "../../../../store";

export type AccentColors = "violet" | "indigo" | "blue" | "orange";

const accentColors: AccentColors[] = ["violet", "indigo", "blue", "orange"];

function AccentColor() {
  const { colors } = useMantineTheme();
  const accentColor = useStore((state) => state.accentColor);

  const setAccentColor = (color: AccentColors) => {
    useStore.setState({ accentColor: color });
    window.localStorage.setItem("accentColor", color);
  };

  return (
    <Group position="center" spacing={30}>
      {accentColors.map((color) => (
        <ColorSwatch
          color={colors[color][5]}
          key={color}
          size={40}
          style={{ cursor: "pointer" }}
          onClick={() => setAccentColor(color)}
        >
          {accentColor === color && (
            <IconCheck style={{ color: "white" }} width={30} />
          )}
        </ColorSwatch>
      ))}
    </Group>
  );
}

export { AccentColor };
