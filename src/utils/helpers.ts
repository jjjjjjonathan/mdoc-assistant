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

export const generatePreMatchTweet = (
  stadium: string,
  homeTeamTwitter: string,
  awayTeamTwitter: string,
  division: string,
  extraContext: string,
  hashtags: string[],
  isNeutral: boolean,
  isForChampionship: boolean
) => {
  let tweet = `It's 30 minutes to kick-off here at ${stadium}.\n\n`;

  if (isNeutral) {
    tweet += `${homeTeamTwitter} and ${awayTeamTwitter} face off `;
  } else {
    tweet += `${homeTeamTwitter} host ${awayTeamTwitter} `;
  }

  if (isForChampionship) {
    tweet += `for the ${division
      .replace("Playoffs", "")
      .trimEnd()} championship.\n\n`;
  } else {
    tweet += `in ${division} action.\n\n`;
  }

  extraContext.length > 0 ? (tweet += `${extraContext}\n\n`) : "";

  tweet += hashtags.join(" | ");
  return tweet;
};

export const generateKickoffTweet = (
  tweetContent: string,
  homeTeamTwitter: string,
  awayTeamTwitter: string,
  hashtags: string[]
) => {
  return `${tweetContent}\n\n${homeTeamTwitter} vs ${awayTeamTwitter}\n\n${hashtags.join(
    " | "
  )}`;
};

export const generateMatchTweet = (
  minute: string,
  homeTeamTwitter: string,
  awayTeamTwitter: string,
  homeScore: number,
  awayScore: number,
  midMatchTweet: string,
  hashtags: string[]
) => {
  return `${minute}' – ${midMatchTweet}\n\n${homeTeamTwitter} ${homeScore}-${awayScore} ${awayTeamTwitter}\n\n${hashtags.join(
    " | "
  )}`;
};

export const generateGoalTweet = (
  goalTweet: string,
  homeTeamTwitter: string,
  homeTeamScore: number,
  awayTeamTwitter: string,
  awayTeamScore: number,
  isHomeGoal: boolean,
  minute: string,
  hashtags: string[]
) => {
  return `${minute}' – GOAL for ${
    isHomeGoal ? homeTeamTwitter : awayTeamTwitter
  }\n\n${goalTweet}\n\n${homeTeamTwitter} ${homeTeamScore}-${awayTeamScore} ${awayTeamTwitter}\n\n${hashtags.join(
    " | "
  )}`;
};

export const generateRedCardTweet = (
  redCardMinute: string,
  redCardPlayer: string,
  homeTeamTwitter: string,
  homeTeamScore: number,
  awayTeamTwitter: string,
  awayTeamScore: number,
  isHomeRedCard: boolean,
  hashtags: string[]
) => {
  return `${redCardMinute}' – RED CARD issued to ${
    isHomeRedCard ? homeTeamTwitter : awayTeamTwitter
  } ${redCardPlayer}\n\n${homeTeamTwitter} ${homeTeamScore}-${awayTeamScore} ${awayTeamTwitter}\n\n${hashtags.join(
    " | "
  )}`;
};

export const generateBreakTweet = (
  stadium: string,
  homeTeamTwitter: string,
  homeTeamScore: number,
  awayTeamTwitter: string,
  awayTeamScore: number,
  breakContent: string,
  isFullTime: boolean,
  hashtags: string[]
) => {
  return `${isFullTime ? "Full-time" : "Half-time"}${
    isFullTime ? ` between ${homeTeamTwitter} and ${awayTeamTwitter}` : ""
  } at ${stadium}!\n\n${breakContent}\n\n${
    isFullTime
      ? ""
      : `${homeTeamTwitter} ${homeTeamScore}-${awayTeamScore} ${awayTeamTwitter}\n\n`
  }${hashtags.join(" | ")}`;
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

export const getWinningTeamName = (
  homeTeam: string,
  awayTeam: string,
  homeScore: number,
  awayScore: number,
  homePenalties: number,
  awayPenalties: number
) => {
  if (homeScore === awayScore) {
    return homePenalties > awayPenalties ? homeTeam : awayTeam;
  } else if (homeScore > awayScore) {
    return homeTeam;
  } else {
    return awayTeam;
  }
};
