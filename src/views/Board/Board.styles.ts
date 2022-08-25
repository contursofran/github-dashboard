import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  content: {
    flex: 1,
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  grid: {
    height: "100%",
    width: "100%",
    padding: theme.spacing.xl * 1.5,
  },
}));

export { useStyles };
