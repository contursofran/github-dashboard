import { Paper, ScrollArea, Stack, Title } from "@mantine/core";
import { trpc } from "../../../../utils/trpc";
import { Events } from "./Events/";
import { useStyles } from "./Timeline.styles";
import { TimelineSkeleton } from "./TimelineSkeleton";

function Timeline({ username }: { username: string | undefined }) {
  // use of any is required because the types are incorrect in the library
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { classes } = useStyles();
  const { data } = trpc.useQuery(["github.getUserEvents", { username }], {
    enabled: !!username,
  });

  if (!data) {
    return <TimelineSkeleton />;
  }

  return (
    <>
      <Paper withBorder className={classes.card} p="lg" radius="md">
        <Stack sx={{ height: "100%" }}>
          <Title size={18}>Last activity</Title>
          <ScrollArea
            classNames={{
              thumb: classes.scrollBarThumb,
              scrollbar: classes.scrollBar,
              root: classes.scrollBarRoot,
            }}
            pr="xs"
            scrollHideDelay={500}
            style={{ flex: "1 1 0" }}
          >
            <Events events={data} />
          </ScrollArea>
        </Stack>
      </Paper>
    </>
  );
}

export { Timeline };
