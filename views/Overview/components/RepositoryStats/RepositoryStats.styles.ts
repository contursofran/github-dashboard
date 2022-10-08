import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.dark[8],
    borderColor: "#2E3036",
  },
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.blue[4]
        : theme.colors.gray[4],
  },
}));

export { useStyles };
