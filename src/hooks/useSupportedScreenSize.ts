import { useMediaQuery } from "@mantine/hooks";
import {
  cleanNotificationsQueue,
  showNotification,
} from "@mantine/notifications";
import { useEffect } from "react";
import { icons, useStyles } from "../styles/Notifications.styles";

function useSupportedScreenSize() {
  const { classes } = useStyles();
  const smallScreen = useMediaQuery("(max-width: 1035px)");

  useEffect(() => {
    if (smallScreen) {
      showNotification({
        classNames: {
          title: classes.title,
          icon: classes.warningIcon,
          root: classes.root,
          closeButton: classes.closeButton,
        },
        title: "Screen size not supported",
        message: "",
        icon: icons.warning,
      });
      cleanNotificationsQueue();
    }
  }, [smallScreen, classes]);
}

export { useSupportedScreenSize };
