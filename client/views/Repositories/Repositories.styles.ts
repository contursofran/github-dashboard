import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  content: {
    alignSelf: "stretch",
    padding: theme.spacing.xl,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    padding: theme.spacing.xl,
  },
}));

export { useStyles };
