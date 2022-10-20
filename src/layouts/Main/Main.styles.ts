import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },

  body: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignSelf: "stretch",
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.dark[7],
  },

  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    paddingTop: "1rem",
    width: "100%",
  },

  scrollBarThumb: {
    backgroundColor: theme.colors.dark[6],
  },

  test: {
    display: "flex",
  },

  scrollBar: {
    paddingBottom: "6rem",

    '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
      backgroundColor: theme.colors.dark[5],
    },
    "&,&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      cursor: "pointer",
    },
    marginRight: "10px",
  },

  scrollArea: {
    paddingTop: "1rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    paddingBottom: "4.5rem",
    width: "100%",
  },

  scrollAreaViewport: {
    "& > div": {
      display: "flex !important",
    },
    display: "flex",
  },
}));

export { useStyles };
