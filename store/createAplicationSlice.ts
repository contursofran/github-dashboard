import { StateCreator } from "zustand";
import { BoardTabs } from "../views/Board/Board";
import { ListHandlers, ListState } from "../views/Board/hooks/useLists";

export interface AplicationSlice {
  cards: ListState;
  cardsHandlers: ListHandlers;
  currentPage: string;
  selectedRepositoryId: string;
  selectedTab: BoardTabs;
}

const createAplicationSlice: StateCreator<AplicationSlice> = () => ({
  currentPage: "",
  cards: [],
  cardsHandlers: [],
  selectedRepositoryId: "",
  selectedTab: "features",
});

export { createAplicationSlice };
