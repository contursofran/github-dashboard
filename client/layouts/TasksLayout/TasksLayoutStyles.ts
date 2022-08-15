import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "start",
    alignSelf: "stretch",
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.dark[7],
  },
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
    padding: theme.spacing.xl * 2.5,
  },
}));

export { useStyles };
