import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";

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

  return {
    createCardMutation,
    selectedProject,
  };
}

export { useCard };
