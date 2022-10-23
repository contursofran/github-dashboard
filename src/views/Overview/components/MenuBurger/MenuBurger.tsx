import { Drawer, Group } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons";
import { useState } from "react";
import { Timeline } from "../Timeline/";

function MenuBurger() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        overlayBlur={0}
        position="right"
        size="lg"
        styles={{
          closeButton: {
            display: "none",
          },
          header: {
            display: "none",
          },
        }}
        onClose={() => setOpened(false)}
      >
        <Timeline borderless />
      </Drawer>

      <Group align="center" position="center">
        <IconMenu2 onClick={() => setOpened(true)} />
      </Group>
    </>
  );
}

export { MenuBurger };
