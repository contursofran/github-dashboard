import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    // minWidth: "300px",
    height: "100%",
    backgroundColor: theme.colors.dark[8],
    // margin: "2rem",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  scrollBarThumb: {
    backgroundColor: theme.colors.dark[6],
  },
  scrollBar: {
    '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
      backgroundColor: theme.colors.dark[6],
    },
    "&,&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
      cursor: "pointer",
    },
  },
  scrollBarRoot: {},
}));

export { useStyles };
