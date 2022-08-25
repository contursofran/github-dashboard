import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[9],
  },
  button: {
    backgroundColor: theme.colors.dark[theme.colorScheme === "dark" ? 5 : 6],
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
    },
  },
}));

export { useStyles };
