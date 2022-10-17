import { showNotification } from "@mantine/notifications";
import { Type } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useStore } from "../../../store";
import { icons, useStyles } from "../../../styles/Notifications.styles";
import { trpc } from "../../../utils/trpc";
import { useRefetchCards } from "./useRefetchCards";

interface CardInput {
  id: string;
  index: number;
  tagForm: string | undefined;
  textForm: string | undefined;
  titleForm: string;
  type: Type;
}

function useCard(setEditingCard: (boolean: boolean) => void) {
  const { classes } = useStyles();
  const selectedTab = useStore((state) => state.selectedTab);
  const selectedRepositoryId = useStore((state) => state.selectedRepositoryId);
  const cardsHandler = useStore((state) => state.cardsHandlers);
  const cards = useStore((state) => state.cards);
  const { status } = useSession();
  const { reFetchCards, startOne } = useRefetchCards();

  const createCardMutation = trpc.useMutation([`${selectedTab}.create`], {
    onMutate: () => {
      startOne();
      setEditingCard(false);
    },
    onSettled: () => {
      reFetchCards();
    },
    onSuccess: () => {
      showNotification({
        classNames: {
          title: classes.title,
          icon: classes.successIcon,
          root: classes.root,
          closeButton: classes.closeButton,
        },
        title: "Card created",
        message: "",
        icon: icons.success,
      });
    },
  });

  const updateCardMutation = trpc.useMutation([`${selectedTab}.update`], {
    onMutate: () => {
      startOne();
      setEditingCard(false);
    },
    onSettled: () => {
      reFetchCards();
    },
    onSuccess: () => {
      showNotification({
        classNames: {
          title: classes.title,
          icon: classes.successIcon,
          root: classes.root,
          closeButton: classes.closeButton,
        },
        title: "Card updated",
        message: "",
        icon: icons.success,
      });
    },
  });

  const deleteCardMutation = trpc.useMutation([`${selectedTab}.delete`], {
    onMutate: () => {
      startOne();
    },
    onSettled: () => {
      reFetchCards();
    },
    onSuccess: () => {
      setEditingCard(false);

      showNotification({
        classNames: {
          title: classes.title,
          icon: classes.successIcon,
          root: classes.root,
          closeButton: classes.closeButton,
        },
        title: "Card deleted",
        message: "",
        icon: icons.success,
      });
    },
  });

  const getType = (type: Type) => {
    switch (type) {
      case "Todo":
        return 0;
      case "InProgress":
        return 1;
      case "Done":
        return 2;
      default:
        return 0;
    }
  };

  const createCard = (props: CardInput) => {
    const { id, index, tagForm, textForm, titleForm, type } = props;

    cardsHandler[getType(props.type)].insert(props.index, {
      id: id,
      title: titleForm,
      description: textForm ? textForm : null,
      index: index,
      tag: tagForm ? tagForm : null,
      type: type,
    });

    if (status === "authenticated") {
      createCardMutation.mutate({
        title: titleForm,
        description: textForm,
        tag: tagForm,
        type: type,
        index: index,
        repositoryId: selectedRepositoryId,
      });
    } else {
      setEditingCard(false);
      showNotification({
        classNames: {
          title: classes.title,
          icon: classes.successIcon,
          root: classes.root,
          closeButton: classes.closeButton,
        },
        title: "Card created",
        message: "",
        icon: icons.success,
      });
    }
  };

  const updateCard = (props: CardInput) => {
    const { id, index, tagForm, textForm, titleForm, type } = props;

    cardsHandler[getType(props.type)].setItem(index, {
      id: id,
      title: titleForm,
      description: textForm ? textForm : null,
      index: index,
      tag: tagForm ? tagForm : null,
      type: type,
    });

    if (status === "authenticated") {
      updateCardMutation.mutate({
        id: id,
        title: titleForm,
        description: textForm,
        tag: tagForm,
        type: type,
        index: index,
        repositoryId: selectedRepositoryId,
      });
    } else {
      setEditingCard(false);
      showNotification({
        classNames: {
          title: classes.title,
          icon: classes.successIcon,
          root: classes.root,
          closeButton: classes.closeButton,
        },
        title: "Card updated",
        message: "",
        icon: icons.success,
      });
    }
  };

  const deleteCard = ({ id, type }: { id: string; type: Type }) => {
    console.log(id);
    const card = cards[getType(type)].find((card) => card.id === id);
    if (card) {
      cardsHandler[getType(type)].remove(card.index);

      if (status === "authenticated") {
        deleteCardMutation.mutate({
          id: id,
        });
      } else {
        setEditingCard(false);
        showNotification({
          classNames: {
            title: classes.title,
            icon: classes.successIcon,
            root: classes.root,
            closeButton: classes.closeButton,
          },
          title: "Card deleted",
          message: "",
          icon: icons.success,
        });
      }
    }
  };

  return {
    createCard,
    createCardMutation,
    updateCardMutation,
    deleteCard,
    updateCard,
  };
}

export { useCard };
