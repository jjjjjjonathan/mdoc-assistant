import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import Jimp from "jimp";
import { env } from "~/env.mjs";
import { getWinningTeamName } from "~/utils/helpers";

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
          scheduledTime: true,
          homeTeam: {
            select: {
              name: true,
              rosterUrl: true,
              xiGraphic: true,
              hex: true,
              coachHex: true,
              twitterHandle: true,
            },
          },
          awayTeam: {
            select: {
              name: true,
              rosterUrl: true,
              xiGraphic: true,
              hex: true,
              coachHex: true,
              twitterHandle: true,
            },
          },
          homeTeamId: true,
          awayTeamId: true,
          division: {
            select: {
              name: true,
              id: true,
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

  createFullTimeGraphic: privateProcedure
    .input(
      z.object({
        homeScore: z.number(),
        awayScore: z.number(),
        base64: z.string(),
        homeTeam: z.string(),
        awayTeam: z.string(),
        division: z.string(),
        divisionId: z.number(),
        homePenalties: z.number(),
        awayPenalties: z.number(),
        isMatchWithPenalties: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const splitBase64 = input.base64.split(",");
      const buffer = Buffer.from(splitBase64[1] as string, "base64");
      const graphic = await Jimp.read(buffer);
      const font = await Jimp.loadFont(
        `${env.STATIC_FILES}jimp-fonts/leagueSpartanWhite.fnt`
      );
      const finalsTextFont = await Jimp.loadFont(
        `${env.STATIC_FILES}jimp-fonts/smallLeagueSpartan.fnt`
      );
      const winningTeam = getWinningTeamName(
        input.homeTeam,
        input.awayTeam,
        input.homeScore,
        input.awayScore,
        input.homePenalties,
        input.awayPenalties
      );
      const penaltyFont = await Jimp.loadFont(
        `${env.STATIC_FILES}jimp-fonts/penalty.fnt`
      );
      graphic.print(
        font,
        input.divisionId > 2 && input.isMatchWithPenalties ? -155 : -125,
        55,
        {
          text: input.homeScore.toString(10),
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
        },
        1080,
        1080
      );

      if (input.isMatchWithPenalties) {
        graphic.print(
          penaltyFont,
          input.divisionId > 2 && input.homeScore === input.awayScore
            ? -85
            : -125,
          55,
          {
            text: `(${input.homePenalties})`,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
          },
          1080,
          1080
        );

        graphic.print(
          penaltyFont,
          input.divisionId > 2 && input.homeScore === input.awayScore
            ? -85
            : -125,
          285,
          {
            text: `(${input.awayPenalties})`,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
          },
          1080,
          1080
        );
      }

      graphic.print(
        font,
        input.divisionId > 2 && input.isMatchWithPenalties ? -155 : -125,
        285,
        {
          text: input.awayScore.toString(10),
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
        },
        1080,
        1080
      );

      if (input.divisionId > 2) {
        graphic.print(
          finalsTextFont,
          0,
          435,
          {
            text: `${winningTeam} win the ${input.division}`
              .replace("Playoffs", "")
              .toUpperCase(),
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
          },
          1080,
          1080
        );
      }

      const base64 = await graphic.getBase64Async(Jimp.AUTO);
      const altText = `Full time between ${input.homeTeam} and ${
        input.awayTeam
      } in League1 Ontario's ${input.division}. The final score is ${
        input.homeTeam
      }: ${input.homeScore}, ${input.awayTeam}: ${input.awayScore}.${
        input.divisionId > 2
          ? ` ${winningTeam} are the 2023 ${input.division.replace(
              "Playoffs",
              ""
            )} champions${
              input.isMatchWithPenalties
                ? ` after winning ${
                    input.homePenalties > input.awayPenalties
                      ? input.homePenalties
                      : input.awayPenalties
                  }-${
                    input.homePenalties < input.awayPenalties
                      ? input.homePenalties
                      : input.awayPenalties
                  } on penalty kicks.`
                : "."
            }`
          : ""
      }`;
      return { base64, altText };
    }),
});
