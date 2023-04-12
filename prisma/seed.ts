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
              xiGraphic: "alliance-men",
              hex: "#4A5258",
            },
            {
              name: "Blue Devils FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815395?subseason=875807",
              twitterHandle: "@TheBlueDevilsFC",
              logo: "OBD",
              xiGraphic: "obd-men",
              hex: "#2D2C2E",
            },
            {
              name: "Burlington FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815396?subseason=875807",
              twitterHandle: "@burlsoccer",
              logo: "Burlington",
              xiGraphic: "burl-men",
              hex: "#EEB720",
            },
            {
              name: "BVB IA Waterloo",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815397?subseason=875807",
              twitterHandle: "@bvbiawaterloo",
              logo: "BVB",
              xiGraphic: "bvb-men",
              hex: "#E4D906",
            },
            {
              name: "Darby FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815398?subseason=875807",
              twitterHandle: "@DarbyFCL1OM",
              logo: "Darby",
              xiGraphic: "darby-men",
              hex: "#483F3A",
            },
            {
              name: "Electric City FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815399?subseason=875807",
              twitterHandle: "@ElectricCityFC",
              logo: "ECFC",
              xiGraphic: "ecfc-men",
              hex: "#566169",
            },
            {
              name: "FC London",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815400?subseason=875807",
              twitterHandle: "@FCLondon",
              logo: "London",
              xiGraphic: "london-men",
              hex: "#382E2D",
            },
            {
              name: "Guelph United",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815401?subseason=875807",
              twitterHandle: "@guelphunitedfc",
              logo: "GuelphUnited",
              xiGraphic: "guelph-united",
              hex: "#29292C",
            },
            {
              name: "Hamilton United",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815402?subseason=875807",
              twitterHandle: "@HamutdElite",
              logo: "Hamilton",
              xiGraphic: "ham-men",
              hex: "#676664",
            },
            {
              name: "Master's FA",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815403?subseason=875807",
              twitterHandle: "@MastersFA",
              logo: "MFA",
              xiGraphic: "mfa",
              hex: "#DFD2E6",
            },
            {
              name: "North Mississauga SC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815404?subseason=875807",
              twitterHandle: "@NMSC_Panthers",
              logo: "NMSC",
              xiGraphic: "northmiss-men",
              hex: "#332E2E",
            },
            {
              name: "North Toronto Nitros",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815405?subseason=875807",
              twitterHandle: "@NT_SoccerClub",
              logo: "Nitros",
              xiGraphic: "nt-men",
              hex: "#575B62",
            },
            {
              name: "ProStars FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815407?subseason=875807",
              twitterHandle: "@ProStarsFC1",
              logo: "ProStars",
              xiGraphic: "prostars-men",
              hex: "#C73041",
            },
            {
              name: "Scrosoppi FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815408?subseason=875807",
              twitterHandle: "@FcScrosoppi",
              logo: "Scrosoppi",
              xiGraphic: "scrosoppi",
              hex: "#3D3F45",
            },
            {
              name: "Sigma FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815409?subseason=875807",
              twitterHandle: "@SigmaFC",
              logo: "Sigma",
              xiGraphic: "sigma",
              hex: "#8D9A9C",
            },
            {
              name: "Simcoe County Rovers FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815410?subseason=875807",
              twitterHandle: "@RoversFC_L1O",
              logo: "Simcoe",
              xiGraphic: "scr-men",
              hex: "#3B3735",
            },
            {
              name: "St. Catherines Roma Wolves",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815411?subseason=875807",
              twitterHandle: "@stcromawolvesL1",
              logo: "StCatherines",
              xiGraphic: "stc-men",
              hex: "#372D2C",
            },
            {
              name: "Unionville Milliken SC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815412?subseason=875807",
              twitterHandle: "@u_msc",
              logo: "UMSC",
              xiGraphic: "umsc-men",
              hex: "#3A332E",
            },
            {
              name: "Vaughan Azzurri",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815413?subseason=875807",
              twitterHandle: "@vaughansoccercl",
              logo: "Vaughan",
              xiGraphic: "vsc-men",
              hex: "#666462",
            },
            {
              name: "Windsor City FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815414?subseason=875807",
              twitterHandle: "@WinTFC",
              logo: "Windsor",
              xiGraphic: "windsor",
              hex: "#363940",
            },
            {
              name: "Woodbridge Strikers",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815415?subseason=875807",
              twitterHandle: "@WoodbridgeL1OM",
              logo: "Woodbridge",
              xiGraphic: "wood-men",
              hex: "#3D3C33",
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
              xiGraphic: "alliance-women",
              hex: "#4A5258",
            },
            {
              name: "Blue Devils FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815432?subseason=875808",
              twitterHandle: "@TheBlueDevilsFC",
              logo: "OBD",
              xiGraphic: "obd-women",
              hex: "#2D2C2E",
            },
            {
              name: "Burlington FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815433?subseason=875808",
              twitterHandle: "@burlsoccer",
              logo: "Burlington",
              xiGraphic: "burl-women",
              hex: "#EEB720",
            },
            {
              name: "BVB IA Waterloo",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815434?subseason=875808",
              twitterHandle: "@bvbiawaterloo",
              logo: "BVB",
              xiGraphic: "bvb-women",
              hex: "#E4D906",
            },
            {
              name: "Darby FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815435?subseason=875808",
              twitterHandle: "@DARBYFCL1O",
              logo: "Darby",
              xiGraphic: "darby-women",
              hex: "#483F3A",
            },
            {
              name: "Electric City FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815436?subseason=875808",
              twitterHandle: "@ElectricCityFC",
              logo: "ECFC",
              xiGraphic: "ecfc-women",
              hex: "#566169",
            },
            {
              name: "FC London",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815437?subseason=875808",
              twitterHandle: "@FCLondon",
              logo: "London",
              xiGraphic: "london-women",
              hex: "#382E2D",
            },
            {
              name: "Guelph Union",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815438?subseason=875808",
              twitterHandle: "@GuelphUnion",
              logo: "GuelphUnion",
              xiGraphic: "guelph-union",
              hex: "#29292C",
            },
            {
              name: "Hamilton United",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815439?subseason=875808",
              twitterHandle: "@HamutdElite",
              logo: "Hamilton",
              xiGraphic: "ham-women",
              hex: "#676664",
            },
            {
              name: "NDC-Ontario",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815440?subseason=875808",
              twitterHandle: "@NDC_Ontario",
              logo: "NDC",
              xiGraphic: "ndc",
              hex: "#61676B",
            },
            {
              name: "North Mississauga SC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815441?subseason=875808",
              twitterHandle: "@NMSC_Panthers",
              logo: "NMSC",
              xiGraphic: "northmiss-women",
              hex: "#332E2E",
            },
            {
              name: "North Toronto Nitros",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815442?subseason=875808",
              twitterHandle: "@NT_SoccerClub",
              logo: "Nitros",
              xiGraphic: "nt-women",
              hex: "#575B62",
            },
            {
              name: "ProStars FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815444?subseason=875808",
              twitterHandle: "@ProStarsFC1",
              logo: "ProStars",
              xiGraphic: "prostars-women",
              hex: "#C73041",
            },
            {
              name: "Simcoe County Rovers FC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815445?subseason=875808",
              twitterHandle: "@RoversFC_L1O",
              logo: "Simcoe",
              xiGraphic: "scr-women",
              hex: "#3B3735",
            },
            {
              name: "St. Catherines Roma Wolves",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815446?subseason=875808",
              twitterHandle: "@stcromawolvesL1",
              logo: "StCatherines",
              xiGraphic: "stc-women",
              hex: "#372D2C",
            },
            {
              name: "Tecumseh SC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815447?subseason=875808",
              twitterHandle: "@TecumsehLeague1",
              logo: "Tecumseh",
              xiGraphic: "tecumseh",
              hex: "#CC143A",
            },
            {
              name: "Unionville Milliken SC",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815448?subseason=875808",
              twitterHandle: "@u_msc",
              logo: "UMSC",
              xiGraphic: "umsc-women",
              hex: "#3A332E",
            },
            {
              name: "Vaughan Azzurri",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815449?subseason=875808",
              twitterHandle: "@vaughansoccercl",
              logo: "Vaughan",
              xiGraphic: "vsc-women",
              hex: "#666462",
            },
            {
              name: "Woodbridge Strikers",
              rosterUrl:
                "https://www.league1ontario.com/roster/show/7815450?subseason=875808",
              twitterHandle: "@WoodbridgeL1OW",
              logo: "Woodbridge",
              xiGraphic: "wood-women",
              hex: "#3D3C33",
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
