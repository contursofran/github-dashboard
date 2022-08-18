import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[7],
  },
  card: {
    ...theme.fn.focusStyles(),
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    marginBottom: theme.spacing.lg,
  },
  cardDragging: {
    boxShadow: theme.shadows.sm,
  },
}));

export { useStyles };
