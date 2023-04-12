import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const matchesRouter = createTRPCRouter({
  getUpcomingUserMatches: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser;
    const timeTwoHoursLater = Date.now();
    const isoTimeTwoHoursLater = new Date(timeTwoHoursLater).toISOString();
    const matches = await ctx.prisma.match.findMany({
      where: {
        AND: [
          { userId },
          {
            scheduledTime: {
              gte: isoTimeTwoHoursLater,
            },
          },
        ],
      },
      select: {
        id: true,
        scheduledTime: true,
        homeTeam: {
          select: {
            name: true,
            logo: true,
            id: true,
          },
        },
        awayTeam: {
          select: {
            name: true,
            logo: true,
            id: true,
          },
        },
        division: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      orderBy: [{ scheduledTime: "asc" }],
      take: 2,
    });

    return matches;
  }),

  getUserMatches: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUser;
    const matches = await ctx.prisma.match.findMany({
      where: { userId },
      select: {
        id: true,
        scheduledTime: true,
        e2eNumber: true,
        homeTeam: {
          select: {
            name: true,
            logo: true,
            id: true,
          },
        },
        awayTeam: {
          select: {
            name: true,
            logo: true,
            id: true,
          },
        },
        division: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      orderBy: [{ scheduledTime: "asc" }],
    });

    return matches;
  }),

  getUniqueMatch: privateProcedure
    .input(z.object({ matchId: z.number() }))
    .query(async ({ ctx, input }) => {
      const match = await ctx.prisma.match.findUnique({
        where: {
          id: input.matchId,
        },
        select: {
          homeTeam: {
            select: {
              name: true,
              rosterUrl: true,
              xiGraphic: true,
              hex: true,
            },
          },
          awayTeam: {
            select: {
              name: true,
              rosterUrl: true,
              xiGraphic: true,
              hex: true,
            },
          },
          homeTeamId: true,
          homeShots: true,
          homeShotsOnTarget: true,
          homeCorners: true,
          homeOffsides: true,
          homeFouls: true,
          awayTeamId: true,
          awayShots: true,
          awayShotsOnTarget: true,
          awayCorners: true,
          awayOffsides: true,
          awayFouls: true,
          goals: {
            select: {
              teamId: true,
              player: {
                select: {
                  name: true,
                },
              },
              half: true,
              minute: true,
            },
          },
          yellowCards: {
            select: {
              teamId: true,
              player: {
                select: {
                  name: true,
                },
              },
              half: true,
              minute: true,
            },
          },
          redCards: {
            select: {
              teamId: true,
              player: {
                select: {
                  name: true,
                },
              },
              half: true,
              minute: true,
            },
          },
          subs: {
            select: {
              teamId: true,
              playerIn: {
                select: { name: true },
              },
              playerOut: {
                select: { name: true },
              },
              half: true,
              minute: true,
            },
          },
        },
      });

      return match;
    }),

  createOrUpdateNewMatch: privateProcedure
    .input(
      z.object({
        division: z.number(),
        homeTeamId: z.number(),
        awayTeamId: z.number(),
        e2eNumber: z.number(),
        scheduledTime: z.string(),
        matchId: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.currentUser;
      const match = await ctx.prisma.match.upsert({
        where: { id: input.matchId || 0 },
        update: {
          e2eNumber: input.e2eNumber,
          divisionId: input.division,
          homeTeamId: input.homeTeamId,
          awayTeamId: input.awayTeamId,
          scheduledTime: input.scheduledTime,
        },
        create: {
          userId,
          e2eNumber: input.e2eNumber,
          divisionId: input.division,
          homeTeamId: input.homeTeamId,
          awayTeamId: input.awayTeamId,
          scheduledTime: input.scheduledTime,
        },
      });

      return match;
    }),

  deleteCreatedMatch: privateProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const match = await ctx.prisma.match.delete({
        where: {
          id: input.id,
        },
      });

      return match;
    }),
});
