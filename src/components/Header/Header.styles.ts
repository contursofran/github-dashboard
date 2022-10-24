import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    height: "70px",
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[0]
        : theme.colors.dark[7],
    alignSelf: "stretch",
    justifyContent: "space-between",
    padding: theme.spacing.xl * 1.5,
  },
}));

export { useStyles };
