import { createStyles } from "@mantine/core";
import { getBackgroundColor } from "../../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  swatch: {
    cursor: "pointer",
    "&:hover": {
      border: `1px solid ${getBackgroundColor(theme)}`,
    },
  },
}));

export { useStyles };
