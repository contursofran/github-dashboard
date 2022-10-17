import { createStyles } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

const icons = {
  success: <IconCheck />,
  error: <IconX />,
};

const useStyles = createStyles((theme) => ({
  root: {
    border: `1px solid #373A40`,
    margin: "1rem",
  },
  closeButton: {
    // on hover should have no background color
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
        : theme.colors.green[6],
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
        : `${theme.colors.red[6]} !important`,
  },
  successIcon: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? `${theme.colors.dark[6]} !important`
        : "#fff !important",
    color:
      theme.colorScheme === "dark"
        ? `${theme.colors.green[6]} !important`
        : `${theme.colors.green[6]} !important`,
  },
}));
export { useStyles, icons };
