import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
  },
  img: {
    width: "110px",
    height: "110px",
    position: "relative",
  },
  root: {
    height: "40px",
  },
  hover: {
    color: theme.colors.dark[6],
    backgroundColor: theme.colors.gray[4],
    "&:hover": {
      backgroundColor: theme.colors.gray[3],
      color: theme.colors.dark[9],
    },
  },
}));

export { useStyles };
