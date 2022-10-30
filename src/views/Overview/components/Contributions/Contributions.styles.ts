import { createStyles } from "@mantine/core";
import { getBackgroundColor } from "../../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    minWidth: "900px",
    height: "100%",
    backgroundColor: getBackgroundColor(theme),
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(52, auto)",
    gridTemplateRows: "repeat(7, auto)",
    gridGap: "7px",
    padding: "1rem",
  },
  gridItem: {
    backgroundColor: getBackgroundColor(theme),
    height: "17px",
    borderRadius: "3px",
    width: "17px",
  },
  swatches: {
    height: 15,
    width: 15,
    borderRadius: 3,
  },
}));

export { useStyles };
