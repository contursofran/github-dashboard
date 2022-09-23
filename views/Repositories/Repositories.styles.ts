import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  content: {
    alignSelf: "stretch",
    padding: theme.spacing.xl,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  grid: {
    padding: theme.spacing.xl,
  },
}));

export { useStyles };
