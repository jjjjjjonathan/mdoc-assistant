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
          },
        },
        awayTeam: {
          select: {
            name: true,
          },
        },
        division: {
          select: {
            name: true,
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
      include: {
        homeTeam: {
          select: {
            name: true,
          },
        },
      },
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
            },
          },
          awayTeam: {
            select: {
              name: true,
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

  createNewMatch: privateProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.currentUser;
    const timeTwoHoursLater = Date.now();
    const isoTimeTwoHoursLater = new Date(timeTwoHoursLater).toISOString();
    const match = await ctx.prisma.match.create({
      data: {
        userId,
        e2eNumber: 11,
        divisionId: 1,
        homeTeamId: 1,
        awayTeamId: 2,
        scheduledTime: isoTimeTwoHoursLater,
      },
    });

    return match;
  }),
});
