import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import * as cheerio from "cheerio";
import axios from "redaxios";
import Jimp from "jimp";
import tinycolor from "tinycolor2";

export type RosterPlayerType = {
  name: string;
  number: number;
  isGoalkeeper: boolean;
  isCaptain: boolean;
  id: number;
};

export const playersRouter = createTRPCRouter({
  getTeamRoster: privateProcedure
    .input(
      z.object({
        rosterUrl: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { data }: { data: string } = await axios(input.rosterUrl);
      const $ = cheerio.load(data);
      const roster: RosterPlayerType[] = [];
      $('tbody[id="rosterListingTableBodyPlayer"] > tr').each(function (id) {
        const name = $(this).find('td[class="name"] > a').text();
        roster.push({
          name: name.replace(/^\d[^A-Za-z]*/, ""),
          number: 0,
          isGoalkeeper: false,
          isCaptain: false,
          id,
        });
      });
      return roster;
    }),

  createTeamXI: privateProcedure
    .input(
      z.object({
        startingXI: z
          .object({
            name: z.string(),
            number: z.number(),
            isGoalkeeper: z.boolean(),
            isCaptain: z.boolean(),
            id: z.number(),
          })
          .array(),
        headCoach: z.string(),
        teamId: z.number(),
        xiGraphic: z.string(),
        hex: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.currentUser;
      const graphic = await Jimp.read(
        `public/xi-graphics/${input.xiGraphic}.png`
      );
      const font = tinycolor.isReadable(
        tinycolor(input.hex),
        tinycolor("FFFFFF"),
        {
          level: "AA",
          size: "small",
        }
      )
        ? await Jimp.loadFont("public/jimp-fonts/publicSansWhite.fnt")
        : await Jimp.loadFont("public/jimp-fonts/publicSansBlack.fnt");

      for (let i = 0; i < 11; i++) {
        graphic.print(
          font,
          90,
          i * 45 + 285,
          {
            text: "88   Orlendis Benitez-Hernandez",
            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
            alignmentY: Jimp.VERTICAL_ALIGN_TOP,
          },
          1080,
          1080
        );
      }

      return await graphic.getBase64Async(Jimp.AUTO);
    }),
});
