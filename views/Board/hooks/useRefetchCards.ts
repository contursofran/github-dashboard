import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";

function useRefetchCards() {
  const selectedTab = useStore((state) => state.selectedTab);
  const selectedRepositoryId = useStore((state) => state.selectedRepositoryId);
  const startOne = useStore((state) => state.startOne);
  const endOne = useStore((state) => state.endOne);
  const allEnded = useStore((state) => state.allEnded);

  const utils = trpc.useContext();

  const reFetchCards = () => {
    endOne();
    if (allEnded()) {
      utils.invalidateQueries([
        `${selectedTab}.get`,
        { repositoryId: selectedRepositoryId },
      ]);
    }
  };

  return { startOne, reFetchCards };
}

export { useRefetchCards };
