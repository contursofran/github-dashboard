import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    height: "200px",
    backgroundColor: theme.colors.dark[8],
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    columnGap: theme.spacing.md,
    rowGap: "4px",
    width: "100%",
  },
  icon: {
    color: theme.colors.blue[3],
  },
}));

export { useStyles };
