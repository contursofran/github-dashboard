import { Features, Type } from "@prisma/client";

export type BoardCard = Omit<Features, "repositoryId">;

export interface Lists {
  items: BoardCard[];
  listName: Type;
}
