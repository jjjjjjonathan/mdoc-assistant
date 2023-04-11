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
          },
        },
        awayTeam: {
          select: {
            name: true,
            logo: true,
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

  createNewMatch: privateProcedure
    .input(
      z.object({
        division: z.number(),
        homeTeamId: z.number(),
        awayTeamId: z.number(),
        e2eNumber: z.number(),
        scheduledTime: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.currentUser;
      // const timeTwoHoursLater = Date.now();
      // const isoTimeTwoHoursLater = new Date(timeTwoHoursLater).toISOString();
      const match = await ctx.prisma.match.create({
        data: {
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
});
