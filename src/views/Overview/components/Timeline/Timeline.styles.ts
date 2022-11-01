import { createStyles } from "@mantine/core";
import {
  getBackgroundColor,
  getScrollBallColor,
} from "../../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: getBackgroundColor(theme),
    border:
      theme.colorScheme === "dark"
        ? "solid 1px #373a40"
        : `solid 1px ${theme.colors.gray[3]}`,
  },
  cardBorderless: {
    width: "100%",
    height: "100%",
    backgroundColor: getBackgroundColor(theme),
    border: "none",
  },

  container: {
    width: "100%",
    height: "100%",
  },
  scrollBarThumb: {
    backgroundColor: theme.colors.dark[6],
  },
  scrollBar: {
    '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
      backgroundColor: getScrollBallColor(theme),
    },
    "&,&:hover": {
      background: theme.colorScheme === "dark" ? theme.colors.dark[8] : "white",
      cursor: "pointer",
    },
  },
  commit: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[3]
        : theme.colors.gray[9],
  },
}));

export { useStyles };
