import superjson from "superjson";
import { createRouter } from "./context";
import { authRouter } from "./routers/auth";
import { featuresRouter } from "./routers/features";
import { githubRouter } from "./routers/github";
import { issuesRouter } from "./routers/issues";
import { repositoryRouter } from "./routers/repository";
import { tasksRouter } from "./routers/tasks";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("features.", featuresRouter)
  .merge("tasks.", tasksRouter)
  .merge("issues.", issuesRouter)
  .merge("repository.", repositoryRouter)
  .merge("github.", githubRouter);

export type AppRouter = typeof appRouter;
