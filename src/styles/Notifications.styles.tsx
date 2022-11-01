import { createStyles } from "@mantine/core";
import { IconAlertTriangle, IconCheck, IconX } from "@tabler/icons";

const icons = {
  success: <IconCheck />,
  error: <IconX />,
  warning: <IconAlertTriangle />,
};

const useStyles = createStyles((theme) => ({
  root: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    margin: "1rem",
  },
  closeButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  items: {
    position: "absolute",
    zIndex: 1000,
    bottom: 0,
    right: 0,
    width: "400px",
  },
  title: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.gray[6],
    fontWeight: 550,
  },
  errorIcon: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.dark[6]} !important`
        : "#fff !important",
    color:
      theme.colorScheme === "dark"
        ? `${theme.colors.red[5]} !important`
        : `${theme.colors.red[5]} !important`,
  },
  successIcon: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.dark[6]} !important`
        : "#fff !important",
    color:
      theme.colorScheme === "dark"
        ? `${theme.colors.green[6]} !important`
        : `${theme.colors.green[5]} !important`,
  },

  warningIcon: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.dark[6]} !important`
        : "#fff !important",
    color:
      theme.colorScheme === "dark"
        ? `${theme.colors.yellow[6]} !important`
        : `${theme.colors.yellow[5]} !important`,
  },
}));
export { useStyles, icons };
