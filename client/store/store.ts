import create from "zustand";
import { createAplicationSlice, AplicationSlice } from "./aplicationSlice";

const useStore = create<AplicationSlice>()((...a) => ({
  ...createAplicationSlice(...a),
}));

export { useStore };
