import { useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";
import { ContributionCalendarMonth, ContributionLevel } from "../types/github";

export const WEEK_LABELS = ["Mon", "Wed", "Fri"];

function useContributions() {
  const { data: data } = trpc.useQuery(["github.getUserContributions"]);
  const [totalWeeks, setTotalWeeks] = useState<number[]>([]);

  const contributionLevels: ContributionLevel[] = [
    ContributionLevel.None,
    ContributionLevel.FirstQuartile,
    ContributionLevel.SecondQuartile,
    ContributionLevel.ThirdQuartile,
    ContributionLevel.FourthQuartile,
  ];

  const weekData = data?.weeks;
  const monthData = data?.months;

  useEffect(() => {
    if (monthData) {
      const totalWeeks: number[] = [];
      let total = 0;

      monthData.forEach((month: ContributionCalendarMonth) => {
        total += month.totalWeeks;
        totalWeeks.push(total);
      });

      setTotalWeeks(totalWeeks);
    }
  }, [monthData]);

  const getMonthPosition = (index: number, cardWidth: number) => {
    const weekWidth = cardWidth / 55.5;
    const monthPosition = totalWeeks[index] * weekWidth;

    if (index === 11 && monthPosition > 950) {
      return monthPosition - weekWidth * 52;
    }

    if (monthPosition === 0) {
      return 21;
    }

    if (!monthPosition) {
      return 0;
    }

    return monthPosition;
  };

  return {
    data,
    getMonthPosition,
    monthData,
    weekData,
    contributionLevels,
  };
}

export { useContributions };