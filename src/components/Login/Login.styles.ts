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
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.gray[4]
        : theme.colors.dark[6],
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.gray[3]
          : theme.colors.dark[9],
      color: theme.colorScheme === "dark" ? theme.colors.dark[9] : "white",
    },
  },
}));

export { useStyles };
