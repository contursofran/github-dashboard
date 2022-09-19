import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.dark[8],
  },
  title: {
    fontColor: theme.colors.red[2],
    fontWeight: 600,
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
}));

export { useStyles };
