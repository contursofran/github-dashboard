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
    alignSelf: "stretch",
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.dark[7],
  },
  content: {
    alignSelf: "stretch",
    padding: "1rem",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));

export { useStyles };
