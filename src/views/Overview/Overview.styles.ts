import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },

  grid: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto auto auto",
    gridGap: "2rem",
  },
}));

export { useStyles };
