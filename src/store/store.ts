import create from "zustand";
import {
  AplicationSlice,
  createAplicationSlice,
} from "./createAplicationSlice";
import { createMutationSlice, MutationSlice } from "./createMutationSlice";

const useStore = create<AplicationSlice & MutationSlice>()((...a) => ({
  ...createAplicationSlice(...a),
  ...createMutationSlice(...a),
}));

export { useStore };
