import { createStyles, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    height: "100px",
  },
}));

function Header() {
  const { classes } = useStyles();
  return <Group className={classes.header}>Header placeholder</Group>;
}

export { Header };
