import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[8],
    width: "450px",
    "&:hover": {
      borderColor: theme.colors.blue[4],
      cursor: "pointer",
    },

    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "400px",
    },

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: "300px",
    },
  },
  title: {
    fontSize: "1.1rem",
  },
  swatch: {
    width: "0.6rem",
    height: "0.6rem",
    marginRight: "-0.3rem",
  },
}));

export { useStyles };
