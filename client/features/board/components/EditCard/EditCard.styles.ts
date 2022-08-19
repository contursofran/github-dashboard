import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[7],
  },
  card: {
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
    alignItems: "center",
  },
  title: { width: "65%" },
  tag: { width: "35%" },
  textArea: { width: "100%" },
}));

export { useStyles };
