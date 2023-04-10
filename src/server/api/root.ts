import { createTRPCRouter } from "~/server/api/trpc";
import { matchesRouter } from "~/server/api/routers/matches";
import { divisionsRouter } from "./routers/divisions";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  matches: matchesRouter,
  divisions: divisionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
