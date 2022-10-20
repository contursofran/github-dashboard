import { createStyles } from "@mantine/core";
import { primaryColorShade } from "../../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.dark[8],
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
