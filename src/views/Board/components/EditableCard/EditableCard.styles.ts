import { createStyles } from "@mantine/core";
import { getIconStyle, getTitleColor } from "../../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },

  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    marginBottom: theme.spacing.lg,
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

  title: {
    width: "60%",
  },

  tag: {
    width: "40%",
  },

  tagDropdown: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    position: "fixed",
    zIndex: 400,
  },

  input: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    color: getTitleColor(theme),
  },

  tagSelect: {
    "&[data-selected]": {
      backgroundColor: theme.colors.dark[8],
    },
  },

  textArea: {
    width: "100%",
  },

  icon: getIconStyle(theme),
}));
export { useStyles };
