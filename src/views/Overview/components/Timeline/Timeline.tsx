import { Paper, ScrollArea, Stack, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import { guestUser } from "../../../../utils/data";
import { trpc } from "../../../../utils/trpc";
import { Events } from "./Events/";
import { useStyles } from "./Timeline.styles";
import { TimelineSkeleton } from "./TimelineSkeleton";

function Timeline() {
  // use of any is required because the types are incorrect in the library
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { classes } = useStyles();
  const { status } = useSession();
  const { data } = trpc.useQuery(["github.getUserEvents"], {
    enabled: status === "authenticated",
  });

  if (!data && status !== "unauthenticated") {
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
            {status === "authenticated" && data ? (
              <Events events={data} />
            ) : (
              <Events events={guestUser.stats.timeline} />
            )}
          </ScrollArea>
        </Stack>
      </Paper>
    </>
  );
}

export { Timeline };
