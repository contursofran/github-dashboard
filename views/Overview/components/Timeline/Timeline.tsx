import { Paper, ScrollArea, Skeleton, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { Events } from "./Events/";
import { useStyles } from "./Timeline.styles";

function Timeline({ username }: { username: string | undefined }) {
  // use of any is required because the types are incorrect in the library
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { classes } = useStyles();
  const { data } = trpc.useQuery(["github.getUserEvents", { username }], {
    enabled: !!username,
  });
  const skeletonItems = Array.from(Array(5).keys());

  if (!data) {
    return (
      <Paper withBorder className={classes.card} p="lg" radius="md">
        <Stack sx={{ height: "100%" }}>
          <Title size={18}>Last activity</Title>
          {skeletonItems.map((item) => (
            <Stack className={classes.container} key={item}>
              <Skeleton height="20px" width="35%" />
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" width="100%" />
              <Skeleton height="20px" mb={8} width="30%" />
            </Stack>
          ))}
        </Stack>
      </Paper>
    );
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
