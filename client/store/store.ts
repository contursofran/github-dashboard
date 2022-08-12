import create from "zustand";
import { createAplicationSlice, AplicationSlice } from "./aplicationSlice";

const store = create<AplicationSlice>()((...a) => ({
  ...createAplicationSlice(...a),
}));

export { store };
