import create from "zustand";
import {
  createAplicationSlice,
  AplicationSlice,
} from "./createAplicationSlice";

const useStore = create<AplicationSlice>()((...a) => ({
  ...createAplicationSlice(...a),
}));

export { useStore };
