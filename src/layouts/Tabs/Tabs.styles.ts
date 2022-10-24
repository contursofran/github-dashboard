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
    alignItems: "start",
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
    paddingTop: 30,
    width: "100%",
  },
  scrollBarThumb: {
    backgroundColor: theme.colors.dark[6],
  },
  scrollBar: {
    paddingBottom: 60,

    '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[3],
    },
    "&,&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      cursor: "pointer",
    },
    marginRight: "25px",
  },
  scrollArea: {
    paddingBottom: 60,
    flexGrow: 1,
  },
}));

export { useStyles };
