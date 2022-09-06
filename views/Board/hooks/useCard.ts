import { Type } from "@prisma/client";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";

interface Props {
  cardId: string;
  tagForm: string;
  textForm: string;
  titleForm: string;
  type: Type;
}

function useCard({ cardId, tagForm, textForm, titleForm, type }: Props) {
  const selectedTab = useStore((state) => state.selectedTab);
  const selectedProject = useStore((state) => state.selectedProject);
  const loadingCard = useStore((state) => state.loadingCard);

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

  const createCard = () => {
    useStore.setState({ loadingCard: true });
    createCardMutation.mutate({
      title: titleForm,
      text: textForm,
      tag: tagForm,
      type: type,
      repositoryName: selectedProject,
    });
  };

  const updateCard = () => {
    useStore.setState({ loadingCard: true });
    updateCardMutation.mutate({
      id: cardId,
      title: titleForm,
      text: textForm,
      tag: tagForm,
      type: type,
    });
  };

  const deleteCard = () => {
    deleteCardMutation.mutate({
      id: cardId,
    });
  };

  return {
    createCard,
    deleteCard,
    updateCard,
    loadingCard,
    updateCardMutation,
    createCardMutation,
  };
}

export { useCard };
