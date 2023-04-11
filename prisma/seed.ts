/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prisma } from "~/server/db";

async function main() {
  console.log("Start seeding men's division and teams...");
  await prisma.division.create({
    data: {
      name: "Men's Division",
      teams: {
        createMany: {
          data: [
            {
              name: "Alliance United FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815394?subseason=875807",
              twitterHandle: "@ALLIANCE_UTDFC",
              logo: "Alliance",
            },
            {
              name: "Blue Devils FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815395?subseason=875807",
              twitterHandle: "@TheBlueDevilsFC",
              logo: "OBD",
            },
            {
              name: "Burlington FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815396?subseason=875807",
              twitterHandle: "@burlsoccer",
              logo: "Burlington",
            },
            {
              name: "BVB IA Waterloo",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815397?subseason=875807",
              twitterHandle: "@bvbiawaterloo",
              logo: "BVB",
            },
            {
              name: "Darby FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815398?subseason=875807",
              twitterHandle: "@DarbyFCL1OM",
              logo: "Darby",
            },
            {
              name: "Electric City FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815399?subseason=875807",
              twitterHandle: "@ElectricCityFC",
              logo: "ECFC",
            },
            {
              name: "FC London",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815400?subseason=875807",
              twitterHandle: "@FCLondon",
              logo: "London",
            },
            {
              name: "Guelph United",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815401?subseason=875807",
              twitterHandle: "@guelphunitedfc",
              logo: "GuelphUnited",
            },
            {
              name: "Hamilton United",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815402?subseason=875807",
              twitterHandle: "@HamutdElite",
              logo: "Hamilton",
            },
            {
              name: "Master's FA",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815403?subseason=875807",
              twitterHandle: "@MastersFA",
              logo: "MFA",
            },
            {
              name: "North Mississauga SC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815404?subseason=875807",
              twitterHandle: "@NMSC_Panthers",
              logo: "NMSC",
            },
            {
              name: "North Toronto Nitros",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815405?subseason=875807",
              twitterHandle: "@NT_SoccerClub",
              logo: "Nitros",
            },
            {
              name: "ProStars FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815407?subseason=875807",
              twitterHandle: "@ProStarsFC1",
              logo: "ProStars",
            },
            {
              name: "Scrosoppi FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815408?subseason=875807",
              twitterHandle: "@FcScrosoppi",
              logo: "Scrosoppi",
            },
            {
              name: "Sigma FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815409?subseason=875807",
              twitterHandle: "@SigmaFC",
              logo: "Sigma",
            },
            {
              name: "Simcoe County Rovers FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815410?subseason=875807",
              twitterHandle: "@RoversFC_L1O",
              logo: "Simcoe",
            },
            {
              name: "St. Catherines Roma Wolves",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815411?subseason=875807",
              twitterHandle: "@stcromawolvesL1",
              logo: "StCatherines",
            },
            {
              name: "Unionville Milliken SC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815412?subseason=875807",
              twitterHandle: "@u_msc",
              logo: "UMSC",
            },
            {
              name: "Vaughan Azzurri",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815413?subseason=875807",
              twitterHandle: "@vaughansoccercl",
              logo: "Vaughan",
            },
            {
              name: "Windsor City FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815414?subseason=875807",
              twitterHandle: "@WinTFC",
              logo: "Windsor",
            },
            {
              name: "Woodbridge Strikers",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815415?subseason=875807",
              twitterHandle: "@WoodbridgeL1OM",
              logo: "Woodbridge",
            },
          ],
        },
      },
    },
  });
  console.log("Start seeding women's division and teams...");
  await prisma.division.create({
    data: {
      name: "Women's Division",
      teams: {
        createMany: {
          data: [
            {
              name: "Alliance United FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815431?subseason=875808",
              twitterHandle: "@ALLIANCE_UTDFC",
              logo: "Alliance",
            },
            {
              name: "Blue Devils FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815432?subseason=875808",
              twitterHandle: "@TheBlueDevilsFC",
              logo: "OBD",
            },
            {
              name: "Burlington FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815433?subseason=875808",
              twitterHandle: "@burlsoccer",
              logo: "Burlington",
            },
            {
              name: "BVB IA Waterloo",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815434?subseason=875808",
              twitterHandle: "@bvbiawaterloo",
              logo: "BVB",
            },
            {
              name: "Darby FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815435?subseason=875808",
              twitterHandle: "@DARBYFCL1O",
              logo: "Darby",
            },
            {
              name: "Electric City FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815436?subseason=875808",
              twitterHandle: "@ElectricCityFC",
              logo: "ECFC",
            },
            {
              name: "FC London",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815437?subseason=875808",
              twitterHandle: "@FCLondon",
              logo: "London",
            },
            {
              name: "Guelph Union",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815438?subseason=875808",
              twitterHandle: "@GuelphUnion",
              logo: "GuelphUnion",
            },
            {
              name: "Hamilton United",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815439?subseason=875808",
              twitterHandle: "@HamutdElite",
              logo: "Hamilton",
            },
            {
              name: "NDC-Ontario",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815440?subseason=875808",
              twitterHandle: "@NDC_Ontario",
              logo: "NDC",
            },
            {
              name: "North Mississauga SC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815441?subseason=875808",
              twitterHandle: "@NMSC_Panthers",
              logo: "NMSC",
            },
            {
              name: "North Toronto Nitros",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815442?subseason=875808",
              twitterHandle: "@NT_SoccerClub",
              logo: "Nitros",
            },
            {
              name: "ProStars FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815444?subseason=875808",
              twitterHandle: "@ProStarsFC1",
              logo: "ProStars",
            },
            {
              name: "Simcoe County Rovers FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815445?subseason=875808",
              twitterHandle: "@RoversFC_L1O",
              logo: "Simcoe",
            },
            {
              name: "St. Catherines Roma Wolves",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815446?subseason=875808",
              twitterHandle: "@stcromawolvesL1",
              logo: "StCatherines",
            },
            {
              name: "Tecumseh SC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815447?subseason=875808",
              twitterHandle: "@TecumsehLeague1",
              logo: "Tecumseh",
            },
            {
              name: "Unionville Milliken SC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815448?subseason=875808",
              twitterHandle: "@u_msc",
              logo: "UMSC",
            },
            {
              name: "Vaughan Azzurri",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815449?subseason=875808",
              twitterHandle: "@vaughansoccercl",
              logo: "Vaughan",
            },
            {
              name: "Woodbridge Strikers",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815450?subseason=875808",
              twitterHandle: "@WoodbridgeL1OW",
              logo: "Woodbridge",
            },
          ],
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
