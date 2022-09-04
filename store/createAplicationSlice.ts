import { StateCreator } from "zustand";
import { BoardTabs } from "../views/Board/Board";

export interface AplicationSlice {
  currentPage: string;
  selectedProject: string;
  selectedTab: BoardTabs;
}

const createAplicationSlice: StateCreator<AplicationSlice> = () => ({
  currentPage: "",
  selectedProject: "",
  selectedTab: "features",
});

export { createAplicationSlice };
