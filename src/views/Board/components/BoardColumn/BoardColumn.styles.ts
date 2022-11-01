import { createStyles } from "@mantine/core";
import {
  getBackgroundColor,
  getScrollBallColor,
} from "../../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: getBackgroundColor(theme),
  },

  title: {
    fontColor: theme.colors.red[2],
    fontWeight: 600,
  },

  scrollBarThumb: {
    backgroundColor: getScrollBallColor(theme),
  },

  scrollBar: {
    '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
      backgroundColor: getScrollBallColor(theme),
    },
    paddingBottom: 10,
    "&,&:hover": {
      background: theme.colorScheme === "dark" ? theme.colors.dark[8] : "white",
      cursor: "pointer",
    },
  },
}));

export { useStyles };
