import { StateCreator } from "zustand";

export interface AplicationSlice {
  currentPage: string;
  selectedProject: string;
}

const createAplicationSlice: StateCreator<AplicationSlice> = (set) => ({
  currentPage: "",
  selectedProject: "",
});

export { createAplicationSlice };
