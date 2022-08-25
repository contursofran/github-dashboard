import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../server/createRouter";

export const trpc = createReactQueryHooks<AppRouter>();
