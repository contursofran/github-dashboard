import { StateCreator } from "zustand";
import { BoardTabs } from "../views/Board/Board";
import { BoardCard } from "../views/Board/types";

export interface AplicationSlice {
  cards: {
    Done: BoardCard[];
    InProgress: BoardCard[];
    Todo: BoardCard[];
  };
  currentPage: string;
  loadingCard: boolean;
  selectedRepository: string;
  selectedTab: BoardTabs;
}

const createAplicationSlice: StateCreator<AplicationSlice> = () => ({
  currentPage: "",
  selectedRepository: "",
  selectedTab: "features",
  loadingCard: false,
  cards: {
    Todo: [],
    InProgress: [],
    Done: [],
  },
});

export { createAplicationSlice };
