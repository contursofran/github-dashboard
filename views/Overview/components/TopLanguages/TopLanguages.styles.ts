import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    // minWidth: "500px",
    minHeight: "230px",
    height: "100%",
    backgroundColor: theme.colors.dark[8],
  },
}));

export { useStyles };