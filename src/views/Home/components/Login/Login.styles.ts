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
  buttonLabel: {
    color: theme.colors.gray[3],
  },
  buttonIcon: {
    color: theme.colors.gray[3],
  },
  buttonRoot: {
    height: "40px",
  },
}));

export { useStyles };
