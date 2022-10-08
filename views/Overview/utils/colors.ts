import { MantineTheme } from "@mantine/core";
import { ContributionLevel } from "../types/github";

export const getColor = (
  contrituionLevel: ContributionLevel,
  colors: MantineTheme
) => {
  switch (contrituionLevel) {
    case ContributionLevel.FirstQuartile:
      return colors.colors.blue[9];
    case ContributionLevel.SecondQuartile:
      return colors.colors.blue[8];
    case ContributionLevel.ThirdQuartile:
      return colors.colors.blue[7];
    case ContributionLevel.FourthQuartile:
      return colors.colors.blue[4];
    case ContributionLevel.None:
      return "#1a1b1e";
  }
};
