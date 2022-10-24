import { createStyles } from "@mantine/core";
import { getBackgroundColor } from "../../utils/mantine";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    backgroundColor: getBackgroundColor(theme),
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
