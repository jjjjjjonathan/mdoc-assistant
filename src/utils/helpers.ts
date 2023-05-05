import type { ColorInput } from "tinycolor2";
import tinycolor from "tinycolor2";

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
