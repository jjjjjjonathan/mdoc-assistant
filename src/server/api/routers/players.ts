import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import * as cheerio from "cheerio";
import axios from "redaxios";

type RosterPlayerType = {
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
    .mutation(async ({ ctx, input }) => {
      const { data }: { data: string } = await axios(input.rosterUrl);
      const $ = cheerio.load(data);
      const content: RosterPlayerType[] = [];
      $('tbody[id="rosterListingTableBodyPlayer"] > tr').each(function (id) {
        const name = $(this).find('td[class="name"] > a').text();
        content.push({
          name: name.replace(/^\d[^A-Za-z]*/, ""),
          number: 0,
          isGoalkeeper: false,
          isCaptain: false,
          id,
        });
      });
      return content;
    }),
});
