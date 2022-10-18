import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: "1rem",
  },
  scrollArea: {
    backgroundColor: "red",
  },
  scrollBarThumb: {
    backgroundColor: theme.colors.dark[6],
  },
  scrollBar: {
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
    paddingLeft: "4px",
  },
}));

export { useStyles };
