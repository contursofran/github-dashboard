import { Type } from "@prisma/client";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";
import { useRefetchCards } from "./useRefetchCards";

interface CardInput {
  cardId: string;
  index: number;
  tagForm: string | undefined;
  textForm: string | undefined;
  titleForm: string;
  type: Type;
}

function useCard({
  setEditingCard,
}: {
  setEditingCard: (boolean: boolean) => void;
}) {
  const selectedTab = useStore((state) => state.selectedTab);
  const selectedRepositoryId = useStore((state) => state.selectedRepositoryId);
  const cardsHandler = useStore((state) => state.cardsHandlers);

  const { reFetchCards, startOne } = useRefetchCards();

  const createCardMutation = trpc.useMutation([`${selectedTab}.create`], {
    onMutate: () => {
      async () => startOne();
      setEditingCard(false);
    },
    onSettled: () => {
      reFetchCards();
    },
  });

  const updateCardMutation = trpc.useMutation([`${selectedTab}.update`], {
    onMutate: () => {
      async () => startOne();
      setEditingCard(false);
    },
    onSettled: () => {
      reFetchCards();
    },
  });

  const deleteCardMutation = trpc.useMutation([`${selectedTab}.delete`], {
    onMutate: () => {
      async () => startOne();
      setEditingCard(false);
    },
    onSettled: () => {
      reFetchCards();
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
    cardsHandler[getType(props.type)].insert(props.index, {
      id: props.cardId,
      title: props.titleForm,
      description: props.textForm ? props.textForm : null,
      index: props.index,
      tag: props.tagForm ? props.tagForm : null,
      type: props.type,
    });
    createCardMutation.mutate({
      title: props.titleForm,
      description: props.textForm,
      tag: props.tagForm,
      type: props.type,
      index: props.index,
      repositoryId: selectedRepositoryId,
    });
  };

  const updateCard = (props: CardInput) => {
    cardsHandler[getType(props.type)].setItem(props.index, {
      id: props.cardId,
      title: props.titleForm,
      description: props.textForm ? props.textForm : null,
      index: props.index,
      tag: props.tagForm ? props.tagForm : null,
      type: props.type,
    });
    updateCardMutation.mutate({
      id: props.cardId,
      title: props.titleForm,
      description: props.textForm,
      tag: props.tagForm,
      type: props.type,
      index: props.index,
      repositoryId: selectedRepositoryId,
    });
  };

  const deleteCard = ({ cardId }: { cardId: string }) => {
    deleteCardMutation.mutate({
      id: cardId,
    });
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
