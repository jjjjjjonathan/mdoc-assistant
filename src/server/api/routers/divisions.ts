import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const divisionsRouter = createTRPCRouter({
  getFormDivisionAndTeams: privateProcedure.query(async ({ ctx }) => {
    const divisions = await ctx.prisma.division.findMany({
      select: {
        id: true,
        name: true,
        teams: {
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    return divisions;
  }),
});
