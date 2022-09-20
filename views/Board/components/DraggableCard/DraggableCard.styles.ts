import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    cursor: "grab",
    backgroundColor: theme.colors.dark[7],
  },
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginBottom: theme.spacing.lg,
  },
  cardDragging: {
    boxShadow: theme.shadows.sm,
  },
  icon: {
    cursor: "pointer",
    "&:hover": { color: "white" },
  },
}));

export { useStyles };
