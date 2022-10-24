import { createStyles } from "@mantine/core";
import {
  getBackgroundColor,
  primaryColorShade,
} from "../../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: getBackgroundColor(theme),
    width: "450px",
    "&:hover": {
      border: "1px solid",
      borderColor: primaryColorShade(theme),
      cursor: "pointer",
    },
  },

  title: {
    fontSize: "1.1rem",
  },
  swatch: {
    width: "0.6rem",
    height: "0.6rem",
    marginRight: "-0.3rem",
  },
  text: {
    minHeight: "49.6px",
  },
}));

export { useStyles };
