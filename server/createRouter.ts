import superjson from "superjson";
import { createRouter } from "./context";
import { authRouter } from "./routers/auth";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter);

export type AppRouter = typeof appRouter;
