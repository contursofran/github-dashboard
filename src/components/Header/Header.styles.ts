import { createStyles } from "@mantine/core";
import { primaryColorShade } from "../../utils/mantine";

const useStyles = createStyles((theme) => ({
  header: {
    height: "70px",
    backgroundColor:
      theme.colorScheme === "light" ? "white" : theme.colors.dark[7],
    alignSelf: "stretch",
    justifyContent: "space-between",
    padding: theme.spacing.xl * 1.5,
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
}));

export { useStyles };
