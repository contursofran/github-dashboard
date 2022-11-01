import { createStyles } from "@mantine/core";
import { getIconStyle } from "../../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  root: {
    cursor: "grab",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },

  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginBottom: theme.spacing.lg,
  },

  cardDragging: {
    boxShadow: theme.shadows.sm,
  },

  icon: getIconStyle(theme),
}));

export { useStyles };
