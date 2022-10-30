import { MantineTheme } from "@mantine/core";

export function primaryColorShade(theme: MantineTheme) {
  return theme.colors[theme.primaryColor][
    Object(theme.primaryShade)[theme.colorScheme]
  ];
}

export function getBackgroundColor(theme: MantineTheme) {
  return theme.colorScheme === "dark" ? theme.colors.dark[8] : "white";
}

export function getTextColor(theme: MantineTheme) {
  return theme.colorScheme === "dark"
    ? theme.colors.gray[4]
    : theme.colors.gray[7];
}

export function getButtonLabelColor(theme: MantineTheme) {
  return theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[6];
}

export function getHoverButtonLabelColor(theme: MantineTheme) {
  return theme.colorScheme === "dark" ? "white" : theme.colors.gray[7];
}

export function getScrollBallColor(theme: MantineTheme) {
  return theme.colorScheme === "dark"
    ? theme.colors.dark[5]
    : theme.colors.gray[3];
}
