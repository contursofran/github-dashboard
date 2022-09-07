import { Type } from "@prisma/client";
import { useEffect } from "react";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";

interface CardInput {
  cardId: string;
  index: number;
  tagForm: string;
  textForm: string;
  titleForm: string;
  type: Type;
}

function useCard() {
  const selectedTab = useStore((state) => state.selectedTab);
  const selectedProject = useStore((state) => state.selectedProject);

  const utils = trpc.useContext();
  const createCardMutation = trpc.useMutation([`${selectedTab}.create`], {
    onSuccess: () => {
      utils.invalidateQueries([
        `${selectedTab}.get`,
        { repository: selectedProject },
      ]);
    },
  });

  const updateCardMutation = trpc.useMutation([`${selectedTab}.update`], {
    onSuccess: () => {
      utils.invalidateQueries([
        `${selectedTab}.get`,
        { repository: selectedProject },
      ]);
    },
  });

  const deleteCardMutation = trpc.useMutation([`${selectedTab}.delete`], {
    onSuccess: () => {
      utils.invalidateQueries([
        `${selectedTab}.get`,
        { repository: selectedProject },
      ]);
    },
  });

  const createCard = (props: CardInput) => {
    createCardMutation.mutate({
      title: props.titleForm,
      text: props.textForm,
      tag: props.tagForm,
      type: props.type,
      index: props.index,
      repositoryName: selectedProject,
    });
  };

  const updateCard = (props: CardInput) => {
    updateCardMutation.mutate({
      id: props.cardId,
      title: props.titleForm,
      text: props.textForm,
      tag: props.tagForm,
      type: props.type,
      index: props.index,
    });
  };

  const deleteCard = ({ cardId }: { cardId: string }) => {
    deleteCardMutation.mutate({
      id: cardId,
    });
  };

  useEffect(() => {
    if (createCardMutation.isLoading) {
      useStore.setState({ loadingCard: true });
    } else {
      useStore.setState({ loadingCard: false });
    }
  }, [createCardMutation.isLoading]);

  return {
    createCard,
    deleteCard,
    updateCard,
  };
}

export { useCard };
