import { Features, Type } from "@prisma/client";

export type List = Omit<Features, "repositoryName" | "userId">;

export interface Lists {
  items: List[];
  listName: Type;
}
