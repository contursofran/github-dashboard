import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: "2rem",
  },
  flex: {
    height: "100%",
  },
  contributions: {
    width: "70%",
  },
  timeline: {
    width: "27%",
    height: "100%",
  },
}));

export { useStyles };
