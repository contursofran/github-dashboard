import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    backgroundColor: theme.colors.dark[8],
    height: "fit-content",
  },

  root: {
    display: "flex",
    padding: "2rem",
    height: "100%",
    width: "100%",
  },
}));

export { useStyles };
