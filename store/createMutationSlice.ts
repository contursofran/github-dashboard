import { StateCreator } from "zustand";

export interface MutationSlice {
  allEnded: () => boolean;
  endOne: () => void;
  mutationsInProgress: number;
  startOne: () => void;
}

const createMutationSlice: StateCreator<MutationSlice> = (set, get) => ({
  mutationsInProgress: 0,
  startOne: () => {
    set((state) => ({ mutationsInProgress: state.mutationsInProgress + 1 }));
  },
  endOne: () => {
    set((state) => ({ mutationsInProgress: state.mutationsInProgress - 1 }));
  },
  allEnded: () => get().mutationsInProgress === 0,
});

export { createMutationSlice };
