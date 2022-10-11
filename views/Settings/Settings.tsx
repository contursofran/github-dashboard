import { Card } from "@mantine/core";
import { Appearance } from "./components/Appearance";
import { useStyles } from "./Settings.styles";

function Settings() {
  const { classes } = useStyles();

  return (
    <Card withBorder className={classes.card} p="lg" radius="md">
      <Appearance />
    </Card>
  );
}

export { Settings };
