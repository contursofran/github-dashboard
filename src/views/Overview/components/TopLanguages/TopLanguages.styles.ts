import { createStyles } from "@mantine/core";
import { getBackgroundColor } from "../../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: getBackgroundColor(theme),
  },
  progress: {
    backgroundColor: theme.colorScheme === "dark" ? "#1a1b1e" : "ebedf0",
  },
}));

export { useStyles };
