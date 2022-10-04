import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: "2rem",
  },
  flex: {
    height: "100%",
    width: "100%",
  },
  container: {
    width: "70%",
    height: "100%",
    gap: "2.5rem",
  },
  timeline: {
    width: "27%",
    height: "100%",
  },
  card: {
    width: "100%",
    minHeight: "230px",
    height: "100%",
    backgroundColor: theme.colors.dark[8],
  },
}));

export { useStyles };
