import { StateCreator } from "zustand";

export interface AplicationSlice {
  currentPage: string;
  selectedProject: string;
}

const createAplicationSlice: StateCreator<AplicationSlice> = () => ({
  currentPage: "",
  selectedProject: "",
});

export { createAplicationSlice };
