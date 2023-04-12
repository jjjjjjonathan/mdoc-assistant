import { createTRPCRouter } from "~/server/api/trpc";
import { matchesRouter } from "~/server/api/routers/matches";
import { divisionsRouter } from "./routers/divisions";
import { playersRouter } from "./routers/players";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  matches: matchesRouter,
  divisions: divisionsRouter,
  players: playersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
