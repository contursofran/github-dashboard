import { Features, Type } from "@prisma/client";

export type BoardCard = Omit<Features, "repositoryName" | "userId">;

export interface Lists {
  items: BoardCard[];
  listName: Type;
}
