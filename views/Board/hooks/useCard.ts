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

function useCard(setEditingCard: (boolean: boolean) => void) {
  const selectedTab = useStore((state) => state.selectedTab);
  const selectedRepositoryId = useStore((state) => state.selectedRepositoryId);
  const cardsHandler = useStore((state) => state.cardsHandlers);
  const cards = useStore((state) => state.cards);
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
    const { cardId, index, tagForm, textForm, titleForm, type } = props;

    cardsHandler[getType(props.type)].insert(props.index, {
      id: cardId,
      title: titleForm,
      description: textForm ? textForm : null,
      index: index,
      tag: tagForm ? tagForm : null,
      type: type,
    });
    createCardMutation.mutate({
      title: titleForm,
      description: textForm,
      tag: tagForm,
      type: type,
      index: index,
      repositoryId: selectedRepositoryId,
    });
  };

  const updateCard = (props: CardInput) => {
    const { cardId, index, tagForm, textForm, titleForm, type } = props;

    cardsHandler[getType(props.type)].setItem(index, {
      id: cardId,
      title: titleForm,
      description: textForm ? textForm : null,
      index: index,
      tag: tagForm ? tagForm : null,
      type: type,
    });
    updateCardMutation.mutate({
      id: cardId,
      title: titleForm,
      description: textForm,
      tag: tagForm,
      type: type,
      index: index,
      repositoryId: selectedRepositoryId,
    });
  };

  const deleteCard = ({ cardId, type }: { cardId: string; type: Type }) => {
    const card = cards[getType(type)].find((card) => card.id === cardId);
    if (card) {
      cardsHandler[getType(type)].remove(card.index);

      deleteCardMutation.mutate({
        id: cardId,
      });
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
