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
  grid: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    columnGap: theme.spacing.md,
    rowGap: "4px",
    width: "100%",
  },
  icon: {
    color: primaryColorShade(theme),
  },
}));

export { useStyles };
