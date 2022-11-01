import { MantineTheme } from "@mantine/core";
import { ContributionLevel } from "../types/github";

export const getColor = (
  contrituionLevel: ContributionLevel,
  theme: MantineTheme
) => {
  if (theme.colorScheme === "dark") {
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
  } else {
    switch (contrituionLevel) {
      case ContributionLevel.FirstQuartile:
        return theme.colors[theme.primaryColor][4];
      case ContributionLevel.SecondQuartile:
        return theme.colors[theme.primaryColor][2];
      case ContributionLevel.ThirdQuartile:
        return theme.colors[theme.primaryColor][1];
      case ContributionLevel.FourthQuartile:
        return theme.colors[theme.primaryColor][0];
      case ContributionLevel.None:
        return "#ebedf0";
    }
  }
};

export const getColorGuest = (
  contrituionLevel: string,
  theme: MantineTheme
) => {
  if (theme.colorScheme === "dark") {
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
  } else {
    switch (contrituionLevel) {
      case ContributionLevel.FirstQuartile:
        return theme.colors[theme.primaryColor][4];
      case ContributionLevel.SecondQuartile:
        return theme.colors[theme.primaryColor][2];
      case ContributionLevel.ThirdQuartile:
        return theme.colors[theme.primaryColor][1];
      case ContributionLevel.FourthQuartile:
        return theme.colors[theme.primaryColor][0];
      case ContributionLevel.None:
        return "#ebedf0";
    }
  }
};

export const getLabelColor = (
  contrituionLevel: ContributionLevel | string,
  theme: MantineTheme
) => {
  if (theme.colorScheme === "dark") {
    switch (contrituionLevel) {
      case "FIRST_QUARTILE":
        return theme.colors[theme.primaryColor][9];
      case "SECOND_QUARTILE":
        return theme.colors[theme.primaryColor][8];
      case "THIRD_QUARTILE":
        return theme.colors[theme.primaryColor][7];
      case "FOURTH_QUARTILE":
        return theme.colors[theme.primaryColor][4];
      default:
        return "#1a1b1e";
    }
  } else {
    switch (contrituionLevel) {
      case "FIRST_QUARTILE":
        return theme.colors[theme.primaryColor][0];
      case "SECOND_QUARTILE":
        return theme.colors[theme.primaryColor][1];
      case "THIRD_QUARTILE":
        return theme.colors[theme.primaryColor][2];
      case "FOURTH_QUARTILE":
        return theme.colors[theme.primaryColor][4];
      default:
        return "#ebedf0";
    }
  }
};

export const getLabelColorGuest = (
  contrituionLevel: string,
  theme: MantineTheme
) => {
  if (theme.colorScheme === "dark") {
    switch (contrituionLevel) {
      case "FIRST_QUARTILE":
        return theme.colors[theme.primaryColor][9];
      case "SECOND_QUARTILE":
        return theme.colors[theme.primaryColor][8];
      case "THIRD_QUARTILE":
        return theme.colors[theme.primaryColor][7];
      case "FOURTH_QUARTILE":
        return theme.colors[theme.primaryColor][4];
      case "NONE":
        return "#1a1b1e";
    }
  } else {
    switch (contrituionLevel) {
      case "FIRST_QUARTILE":
        return theme.colors[theme.primaryColor][0];
      case "SECOND_QUARTILE":
        return theme.colors[theme.primaryColor][1];
      case "THIRD_QUARTILE":
        return theme.colors[theme.primaryColor][2];
      case "FOURTH_QUARTILE":
        return theme.colors[theme.primaryColor][4];
      case "NONE":
        return "#ebedf0";
    }
  }
};

export const getSwatchColor = (theme: MantineTheme, index: number) => {
  if (theme.colorScheme === "dark") {
    switch (index) {
      case 0:
        return theme.colors[theme.primaryColor][4];
      case 1:
        return theme.colors[theme.primaryColor][7];
      case 2:
        return theme.colors[theme.primaryColor][8];
      case 3:
        return theme.colors[theme.primaryColor][9];
      default:
        return "#1a1b1e";
    }
  } else {
    switch (index) {
      case 0:
        return theme.colors[theme.primaryColor][4];
      case 1:
        return theme.colors[theme.primaryColor][2];
      case 2:
        return theme.colors[theme.primaryColor][1];
      case 3:
        return theme.colors[theme.primaryColor][0];
      default:
        return "#ebedf0";
    }
  }
};
