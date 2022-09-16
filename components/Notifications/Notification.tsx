import { Transition } from "@headlessui/react";
import { Notification as NotificationMantine } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { Fragment } from "react";
import { useStyles } from "./Notifications.styles";

const icons = {
  success: <IconCheck />,
  error: <IconX />,
};

export type NotificationProps = {
  notification: {
    id: string;
    title: string;
    type: keyof typeof icons;
  };
  onDismiss: (id: string) => void;
};

function Notification({ notification, onDismiss }: NotificationProps) {
  const { classes } = useStyles();

  return (
    <div>
      <Transition
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={true}
      >
        <NotificationMantine
          classNames={{
            title: classes.title,
            icon:
              notification.type === "error"
                ? classes.errorIcon
                : classes.successIcon,
            root: classes.root,
            closeButton: classes.closeButton,
          }}
          color={notification.type ? "green" : "red"}
          icon={icons[notification.type]}
          title={notification.title}
          onClose={() => onDismiss(notification.id)}
        />
      </Transition>
    </div>
  );
}

export { Notification };
