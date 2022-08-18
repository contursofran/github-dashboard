import { DraggableCardProps } from "../components/DragDropGrid/DraggableCard";

export type List = Omit<DraggableCardProps, "index" | "id">[];

export interface Lists {
  items: Omit<DraggableCardProps, "index" | "id">[];
  listName: string;
}
