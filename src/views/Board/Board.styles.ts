import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  content: {
    flex: 1,
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  grid: {
    height: "100%",
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
  },
}));

export { useStyles };
