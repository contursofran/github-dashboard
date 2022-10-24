import { Card, Group, Stack } from "@mantine/core";
import { useStore } from "../../../../store";
import { useStyles } from "./Theme.styles";

type Theme = "light" | "dark" | "system";

function Theme({ theme }: { theme: Theme }) {
  const { classes, cx } = useStyles();
  const colorScheme = useStore((state) => state.colorScheme);

  const setTheme = (theme: Theme) => {
    useStore.setState({ colorScheme: theme });
    window.localStorage.setItem("colorScheme", theme);
  };

  return (
    <Card
      withBorder
      className={cx(classes.card, {
        [classes.cardLight]: theme === "light",
        [classes.cardDark]: theme === "dark",
        [classes.cardSystem]: theme === "system",
        [classes.activeTheme]: theme === colorScheme,
        [classes.cardHover]: theme !== colorScheme,
      })}
      pb={0}
      pt={"lg"}
      px={"lg"}
      radius="md"
      onClick={() => setTheme(theme)}
    >
      <Group spacing={0} style={{ height: "100%" }}>
        <div
          className={classes.navbar}
          style={{
            backgroundColor: theme === "dark" ? "#141517" : "#f7f7f7",
          }}
        >
          <Stack align="center" justify="center" spacing={7}>
            <div
              className={cx(classes.skeletonCircle, {
                [classes.skeletonColorDark]: theme === "dark",
                [classes.skeletonColorLight]:
                  theme === "light" || theme === "system",
              })}
            />
            <div
              className={cx(classes.skeletonText, {
                [classes.skeletonColorDark]: theme === "dark",
                [classes.skeletonColorLight]:
                  theme === "light" || theme === "system",
              })}
            />
            <div
              className={cx(classes.skeletonText, {
                [classes.skeletonColorDark]: theme === "dark",
                [classes.skeletonColorLight]:
                  theme === "light" || theme === "system",
              })}
            />
          </Stack>
        </div>
        <div
          className={cx(classes.block, {
            [classes.blockDark]: theme === "dark",
            [classes.blockLight]: theme === "light",
            [classes.blockSystem]: theme === "system",
          })}
          style={{ backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff" }}
        >
          <div
            className={cx(classes.skeletonRect, {
              [classes.skeletonColorDark]: theme === "dark",
              [classes.skeletonColorLight]: theme === "light",
              [classes.skeletonColorSystem]: theme === "system",
            })}
          />

          <div
            className={cx(classes.skeletonRect, {
              [classes.skeletonColorDark]: theme === "dark",
              [classes.skeletonColorLight]: theme === "light",
              [classes.skeletonColorSystem]: theme === "system",
            })}
          />

          <div
            className={cx(classes.skeletonRect, {
              [classes.skeletonColorDark]: theme === "dark",
              [classes.skeletonColorLight]: theme === "light",
              [classes.skeletonColorSystem]: theme === "system",
            })}
          />
        </div>
      </Group>
    </Card>
  );
}

export { Theme };
