import { MantineTheme } from "@mantine/core";
import { ContributionLevel } from "../types/github";

export const getColor = (
  contrituionLevel: ContributionLevel,
  theme: MantineTheme
) => {
  switch (contrituionLevel) {
    case ContributionLevel.FirstQuartile:
      return theme.colors[theme.primaryColor][9];
    case ContributionLevel.SecondQuartile:
      return theme.colors[theme.primaryColor][8];
    case ContributionLevel.ThirdQuartile:
      return theme.colors[theme.primaryColor][7];
    case ContributionLevel.FourthQuartile:
      return theme.colors[theme.primaryColor][4];
    case ContributionLevel.None:
      return "#1a1b1e";
  }
};