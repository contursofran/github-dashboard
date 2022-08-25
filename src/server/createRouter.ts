import superjson from "superjson";
import { createRouter } from "./context";
import { userRouter } from "./routers/user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user", userRouter);

export type AppRouter = typeof appRouter;
