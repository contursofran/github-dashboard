import { createStyles } from "@mantine/core";
import { primaryColorShade } from "../../utils/mantine";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
      paddingTop: theme.spacing.md,
    },

    navbar: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      border: "none",
    },

    link: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[4]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        color: theme.white,
        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.gray[4]
          : theme.colors.gray[6],
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "outline",
          color: primaryColorShade(theme),
        }).background,
        color: primaryColorShade(theme),
        [`& .${icon}`]: {
          color: primaryColorShade(theme),
        },
      },
    },

    linkLabel: {
      "@media (min-width: 1560px)": {
        marginLeft: 7,
      },

      "@media (max-width: 1559px)": {
        display: "none",
      },
    },

    avatar: {
      "@media (min-width: 1560px)": {
        height: 70,
        width: 70,
      },
      "@media (max-width: 1559px)": {
        height: 40,
        width: 40,
      },
    },

    userInformation: {
      "@media (max-width: 1560px)": {
        display: "none",
      },
    },

    tooltip: {
      "@media (min-width: 1559px)": {
        display: "none",
      },
    },

    skeletonAvatar: {
      "@media (min-width: 1560px)": {
        height: 70,
        width: 70,
      },
      "@media (max-width: 1559px)": {
        height: 40,
        width: 40,
        // circle
        borderRadius: "50%",
      },
    },

    skeletonUserInformation: {
      "@media (max-width: 1560px)": {
        display: "none",
      },
      "@media (min-width: 1560px)": {
        height: 25,
      },
    },

    skeletonNavBarLinks: {
      "@media (min-width: 1560px)": {
        height: 40,
      },
      "@media (max-width: 1559px)": {
        height: 37,
        width: 50,
      },
    },
  };
});

export { useStyles };
