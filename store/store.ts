import create from "zustand";
import {
  AplicationSlice,
  createAplicationSlice,
} from "./createAplicationSlice";

const useStore = create<AplicationSlice>()((...a) => ({
  ...createAplicationSlice(...a),
}));

export { useStore };
