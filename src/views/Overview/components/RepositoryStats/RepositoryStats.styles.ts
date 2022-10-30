import { createStyles } from "@mantine/core";
import {
  getBackgroundColor,
  primaryColorShade,
} from "../../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: getBackgroundColor(theme),
  },
  icon: {
    color:
      theme.colorScheme === "dark"
        ? primaryColorShade(theme)
        : theme.colors.gray[4],
  },
}));

export { useStyles };
