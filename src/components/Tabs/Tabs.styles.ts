import { createStyles } from "@mantine/core";
import {
  getButtonLabelColor,
  getHoverButtonLabelColor,
} from "../../utils/mantine";

const useStyles = createStyles((theme) => ({
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
  tabsLinks: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: getButtonLabelColor(theme),
    fontSize: theme.fontSizes.sm,
    fontWeight: 600,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
      color: getHoverButtonLabelColor(theme),
    },
  },
}));

export { useStyles };
