import { Modal, Paper } from "@mantine/core";
import { useState } from "react";
import { useStyles } from "./Auth.styles";

function Auth() {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  return <div className={classes.root}></div>;
}

export { Auth };
