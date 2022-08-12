import { StateCreator } from "zustand";

export interface AplicationSlice {
  selectedProject: string;
}

const createAplicationSlice: StateCreator<AplicationSlice> = (set) => ({
  selectedProject: "",
});

export { createAplicationSlice };
