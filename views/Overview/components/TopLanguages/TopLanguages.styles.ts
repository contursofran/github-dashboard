import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    height: "200px",
    backgroundColor: theme.colors.dark[8],
  },
  progress: {
    backgroundColor: "#1a1b1e",
  },
}));

export { useStyles };
