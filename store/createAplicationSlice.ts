import { StateCreator } from "zustand";
import { BoardTabs } from "../views/Board/Board";
import { ListHandlers, ListState } from "../views/Board/hooks/useLists";

export interface AplicationSlice {
  cards: ListState;
  cardsHandlers: ListHandlers;
  selectedRepositoryId: string;
  selectedTab: BoardTabs;
}

const createAplicationSlice: StateCreator<AplicationSlice> = () => ({
  cards: [],
  cardsHandlers: [],
  selectedRepositoryId: "",
  selectedTab: "features",
});

export { createAplicationSlice };
