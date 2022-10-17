import { Card, Title, useMantineTheme } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { getMonth, getShortDate } from "../../helpers/formatDates";
import { getColor } from "../../helpers/getColor";
import {
  ContributionCalendarMonth,
  ContributionLevel,
} from "../../types/github";
import { useStyles } from "./Contributions.styles";
import { ContributionsSkeleton } from "./ContributionsSkeleton";

// TODO: Refactor component
function Contributions() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [cardWidth, setCardWidth] = useState(1078);
  const [totalWeeks, setTotalWeeks] = useState<number[]>([]);
  const { ref, width } = useElementSize();
  const { data: data } = trpc.useQuery(["github.getUserContributions"]);

  const contributionLevels: ContributionLevel[] = [
    ContributionLevel.None,
    ContributionLevel.FirstQuartile,
    ContributionLevel.SecondQuartile,
    ContributionLevel.ThirdQuartile,
    ContributionLevel.FourthQuartile,
  ];

  const weekData = data?.weeks;
  const monthData = data?.months;

  const weekLabels = ["Mon", "Wed", "Fri"];

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

  useEffect(() => {
    if (width) {
      setCardWidth(width);
    }
  }, [width]);

  const getMonthPosition = (index: number) => {
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

  const displayContributions = (day: any) => {
    if (day.contributionCount === 0) {
      return "No contributions on " + getShortDate(day.date);
    } else if (day.contributionCount === 1) {
      return (
        day.contributionCount + " contribution on " + getShortDate(day.date)
      );
    } else {
      return (
        day.contributionCount + " contributions on " + getShortDate(day.date)
      );
    }
  };

  if (!data) {
    return <ContributionsSkeleton />;
  }

  return (
    <Card withBorder className={classes.card} p="lg" radius="md" ref={ref}>
      <Title pb={25} size={18}>
        Total contributions
      </Title>
      <svg width={"100%"}>
        {monthData?.map(
          (month, index) =>
            index < 12 && (
              <text
                fill={theme.colors.gray[4]}
                key={index}
                x={50 + getMonthPosition(index)}
                y={16}
              >
                {getMonth(index)}
              </text>
            )
        )}
        {weekLabels.map((label, index) => (
          <text
            fill={theme.colors.gray[4]}
            key={index}
            x={0}
            y={64 + 40 * index}
          >
            {label}
          </text>
        ))}
        {weekData?.map((week, index) =>
          week.contributionDays.map((day) => (
            <rect
              fill={getColor(day.contributionLevel, theme)}
              height={cardWidth / 76}
              key={day.date}
              rx="2"
              ry="2"
              width={cardWidth / 76}
              x={50 + (index * cardWidth) / 55.5}
              y={30 + day.weekday * 20}
            >
              <title>{displayContributions(day)}</title>
            </rect>
          ))
        )}
      </svg>
      <svg style={{ position: "absolute", right: 0, bottom: 0 }} width={"20%"}>
        <text fill={theme.colors.gray[4]} x={"0%"} y={120}>
          Less
        </text>
        {contributionLevels.map((level, index) => (
          <rect
            fill={getColor(level, theme)}
            height={cardWidth / 76}
            key={level}
            rx="2"
            ry="2"
            width={cardWidth / 76}
            x={cardWidth * 0.045 + (index * cardWidth) / 50}
            y={108}
          />
        ))}
        <text fill={theme.colors.gray[4]} x={"72%"} y={120}>
          More
        </text>
      </svg>
    </Card>
  );
}

export { Contributions };
