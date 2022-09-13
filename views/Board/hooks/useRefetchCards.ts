import { useTrackParallelMutations } from "../../../hooks/useTrackParallelMutations";
import { useStore } from "../../../store";
import { trpc } from "../../../utils/trpc";

function useRefetchCards() {
  const selectedTab = useStore((state) => state.selectedTab);
  const selectedRepositoryId = useStore((state) => state.selectedRepositoryId);
  const mutationTracker = useTrackParallelMutations();
  const utils = trpc.useContext();

  const reFetchCards = () => {
    mutationTracker.endOne();
    if (mutationTracker.allEnded()) {
      utils.invalidateQueries([
        `${selectedTab}.get`,
        { repositoryId: selectedRepositoryId },
      ]);
    }
  };

  const startOne = () => {
    mutationTracker.startOne();
  };
  return { startOne, reFetchCards };
}

export { useRefetchCards };
