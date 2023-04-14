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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    staticFilePath
  );
};
