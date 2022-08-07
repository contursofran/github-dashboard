import { MantineTheme } from "@mantine/core";

export function primaryColorShade(theme: MantineTheme) {
  return theme.colors[theme.primaryColor][
    Object(theme.primaryShade)[theme.colorScheme]
  ];
}
