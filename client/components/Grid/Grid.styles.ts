import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[8],
  },
  title: {
    fontColor: theme.colors.red[2],
    fontWeight: 600,
  },
}));

export { useStyles };
