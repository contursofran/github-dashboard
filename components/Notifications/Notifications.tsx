import { useStore } from "../../store";
import { Notification } from "./Notification";
import { useStyles } from "./Notifications.styles";

export const Notifications = () => {
  const notifications = useStore((state) => state.notifications);
  const dismissNotification = useStore((state) => state.dismissNotification);
  const { classes } = useStyles();

  return (
    <div className={classes.items}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}
    </div>
  );
};
