import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { trpc } from "../../../utils/trpc";
import { ContributionCalendarMonth, ContributionLevel } from "../types/github";

export const WEEK_LABELS = ["Mon", "Wed", "Fri"];

function useContributions() {
  const { status } = useSession();
  const { data: data } = trpc.useQuery(["github.getUserContributions"], {
    enabled: status === "authenticated",
  });
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

  const getMonthPosition = (
    index: number,
    cardWidth: number,
    spacing: number
  ) => {
    const weekWidth = cardWidth / spacing;
    const monthPosition = totalWeeks[index] * weekWidth;

    if (index === 11 && monthPosition / cardWidth > 0.95) {
      return monthPosition - weekWidth * 52;
    }

    if (monthPosition === 0) {
      return 21;
    }

    if (!monthPosition) {
      return 0;
    }

    return monthPosition + 50;
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
