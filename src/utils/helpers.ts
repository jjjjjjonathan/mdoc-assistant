import type { ColorInput } from "tinycolor2";
import tinycolor from "tinycolor2";
import type { RosterPlayerType } from "~/server/api/routers/players";

const white = tinycolor("#FFFFFF");

export const isReadableWhiteFont = (hex: ColorInput) => {
  return tinycolor.isReadable(hex, white, {
    level: "AA",
    size: "large",
  });
};

export const addPlayerLabels = (
  name: string,
  isGoalkeeper: boolean,
  isCaptain: boolean,
  isForAltText: boolean
) => {
  if (isGoalkeeper) {
    if (isForAltText) {
      name += " (goalkeeper)";
    } else {
      name += " (GK)";
    }
  }

  if (isCaptain) {
    if (isForAltText) {
      name += " (captain)";
    } else {
      name += " (C)";
    }
  }

  return name;
};

export const generateKickoffTweet = (
  stadium: string,
  homeTeamTwitter: string,
  awayTeamTwitter: string,
  division: string,
  extraContext: string
) => {
  return `It’s 30 minutes to kick-off here at ${stadium}.\n\n${homeTeamTwitter} host ${awayTeamTwitter} in ${division} action.${
    extraContext.length > 0 ? `\n\n${extraContext}` : ""
  }\n\n#L1OLive #EveryPointMatters`;
};

export const generateMatchTweet = (
  minute: string,
  homeTeamTwitter: string,
  awayTeamTwitter: string,
  homeScore: number,
  awayScore: number,
  midMatchTweet: string
) => {
  return `${minute}' ${homeTeamTwitter} ${homeScore}-${awayScore} ${awayTeamTwitter}\n\n${midMatchTweet}\n\n#L1OLive${
    minute === "HT" || minute === "FT" ? " #EveryPointMatters" : ""
  }`;
};

export const validatePlayerNumbers = (players: RosterPlayerType[]) => {
  return players.filter((player) => player.number >= 0).length === 11;
};

export const validatePlayerNamesLength = (players: RosterPlayerType[]) => {
  return players.filter((player) => player.name.length > 0).length === 11;
};

export const validateOneOrLessGoalkeeper = (players: RosterPlayerType[]) => {
  return players.filter((player) => player.isGoalkeeper).length <= 1;
};

export const validateOneOrLessCaptain = (players: RosterPlayerType[]) => {
  return players.filter((player) => player.isCaptain).length <= 1;
};
