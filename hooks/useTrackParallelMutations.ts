import { useRef } from "react";

// Prevent a refetch while a mutation is running https://github.com/TanStack/query/discussions/2245

export const useTrackParallelMutations = () => {
  const mutationNumber = useRef(0);

  return {
    startOne: () => {
      mutationNumber.current += 1;
    },
    endOne: () => {
      if (mutationNumber.current > 0) {
        mutationNumber.current -= 1;
      }
    },
    allEnded: () => mutationNumber.current === 0,
  };
};
