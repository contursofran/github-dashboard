import { ColorSwatch, Group } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import { useStore } from "../../../../store";
import { useStyles } from "./AccentColor.styles";

export type AccentColors = "violet" | "indigo" | "blue";

const accentColors: AccentColors[] = ["violet", "indigo", "blue"];

function AccentColor() {
  const { classes, cx, theme } = useStyles();
  const accentColor = useStore((state) => state.accentColor);

  const setAccentColor = (color: AccentColors) => {
    useStore.setState({ accentColor: color });
    window.localStorage.setItem("accentColor", color);
  };

  return (
    <Group position="center" spacing={30}>
      {accentColors.map((color) => (
        <ColorSwatch
          className={cx({
            [classes.swatch]: color !== accentColor,
          })}
          color={
            theme.colorScheme === "dark"
              ? theme.colors[color][5]
              : theme.colors[color][5]
          }
          key={color}
          size={40}
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
