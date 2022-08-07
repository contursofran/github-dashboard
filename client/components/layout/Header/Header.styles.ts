import { createStyles } from "@mantine/core";
import { primaryColorShade } from "../../../utils/mantine";

const useStyles = createStyles((theme) => ({
  header: {
    height: "130px",
    backgroundColor:
      theme.colorScheme === "light" ? "white" : theme.colors.dark[7],
    alignSelf: "stretch",
    justifyContent: "space-between",
    padding: theme.spacing.xl,
  },

  tab: {
    "&[data-active]": {
      color:
        theme.colorScheme === "light"
          ? `${primaryColorShade(theme)} !important`
          : theme.colors.gray[4],
    },
    color:
      theme.colorScheme === "light"
        ? `${theme.colors.gray[7]} !important`
        : theme.colors.gray[5],
    fontWeight: 600,
  },
  tabLabel: {
    paddingBottom: "3px",
  },
  title: {
    color:
      theme.colorScheme === "light"
        ? `${theme.colors.gray[6]} !important `
        : theme.colors.gray[6],
  },
  subTitle: {
    color:
      theme.colorScheme === "light"
        ? `${theme.colors.gray[5]} !important `
        : theme.colors.gray[7],
  },

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
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.white,
    },
  },
}));

export { useStyles };
