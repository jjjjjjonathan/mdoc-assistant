import type { ColorInput } from "tinycolor2";
import tinycolor from "tinycolor2";

const white = tinycolor("#FFFFFF");

export const isReadableWhiteFont = (hex: ColorInput) => {
  return tinycolor.isReadable(hex, white, {
    level: "AA",
    size: "small",
  });
};
