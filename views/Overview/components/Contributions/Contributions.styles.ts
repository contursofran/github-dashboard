import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: "73.8%",
    minWidth: "300px",
    height: "230px",
    backgroundColor: theme.colors.dark[8],
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(52, auto)",
    gridTemplateRows: "repeat(7, auto)",
    gridGap: "7px",
    padding: "1rem",
  },
  gridItem: {
    backgroundColor: theme.colors.dark[6],
    height: "17px",
    borderRadius: "3px",
    width: "17px",
  },
}));

export { useStyles };
