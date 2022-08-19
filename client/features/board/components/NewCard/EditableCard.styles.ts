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
    // dot border
    borderRadius: theme.spacing.md,
    border: `1px solid ${theme.colors.dark[5]}`,
  },
  cardDragging: {
    boxShadow: theme.shadows.sm,
  },
  titleTag: {
    display: "flex",
    gap: theme.spacing.md,
  },
  title: { width: "70%" },
  tag: { width: "30%" },
  textArea: { width: "100%" },
}));

export { useStyles };
