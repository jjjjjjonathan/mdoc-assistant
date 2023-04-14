import type { ColorInput } from "tinycolor2";
import tinycolor from "tinycolor2";
import path from "path";
import getConfig from "next/config";

const white = tinycolor("#FFFFFF");

export const isReadableWhiteFont = (hex: ColorInput) => {
  return tinycolor.isReadable(hex, white, {
    level: "AA",
    size: "small",
  });
};

export const serverPath = (staticFilePath: string) => {
  return path.join(
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    staticFilePath
  );
};
