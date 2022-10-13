import { StateCreator } from "zustand";
import { BoardTabs } from "../views/Board/Board";
import { ListHandlers, ListState } from "../views/Board/hooks/useLists";
import { AccentColors } from "../views/Settings/components/AccentColor/AccentColor";
import { Theme } from "../views/Settings/components/Theme";

export interface AplicationSlice {
  accentColor: AccentColors;
  cards: ListState;
  cardsHandlers: ListHandlers;
  colorScheme: Theme;
  selectedRepositoryId: string;
  selectedTab: BoardTabs;
}

const createAplicationSlice: StateCreator<AplicationSlice> = () => ({
  cards: [],
  accentColor: "blue",
  cardsHandlers: [],
  selectedRepositoryId: "",
  selectedTab: "features",
  colorScheme: "system",
});

export { createAplicationSlice };
