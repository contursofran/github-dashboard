import superjson from "superjson";
import { createRouter } from "./context";
import { authRouter } from "./routers/auth";
import { repositoriesRouter } from "./routers/repositories";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("repositories.", repositoriesRouter);

export type AppRouter = typeof appRouter;
