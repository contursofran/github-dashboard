import { Card, Loader, useMantineTheme } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { ContributionCalendarMonth } from "../../types/github";
import { calendarColors, useStyles } from "./Contributions.styles";

function Contributions({ username }: { username: string | undefined }) {
  const { classes } = useStyles();
  const { colorScheme, colors } = useMantineTheme();
  const [cardWidth, setCardWidth] = useState(0);
  const [totalWeeks, setTotalWeeks] = useState<number[]>([]);
  const { ref, width } = useElementSize();
  const { data: data } = trpc.useQuery(
    ["github.getUserContributions", { username }],
    { enabled: !!username }
  );

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

  const getMonth = (index: number) => {
    const currentMonth = new Date().getMonth() + 1;
    const month = currentMonth + index;
    const monthString = new Date(0, month).toLocaleString("default", {
      month: "short",
    });

    return monthString;
  };

  const getMonthPosition = (index: number) => {
    const weekWidth = cardWidth / 55.5;
    const weekOffset = weekWidth;
    const monthPosition = weekOffset + (totalWeeks[index] - 1) * weekWidth;

    if (monthPosition === 0) {
      return 21;
    }

    if (!monthPosition) {
      return 0;
    }

    return monthPosition;
  };

  return (
    <Card withBorder className={classes.card} p="lg" radius="md" ref={ref}>
      {monthData ? (
        <svg height={"100%"} width={"100%"}>
          {monthData?.map(
            (month, index) =>
              index < 12 && (
                <text
                  fill={colors.gray[4]}
                  key={index}
                  x={50 + getMonthPosition(index)}
                  y={16}
                >
                  {getMonth(index)}
                </text>
              )
          )}
          {weekLabels.map((label, index) => (
            <text fill={colors.gray[4]} key={index} x={0} y={64 + 40 * index}>
              {label}
            </text>
          ))}
          {weekData?.map((week, index) =>
            week.contributionDays.map((day) => (
              <rect
                data-hint={"elo"}
                fill={calendarColors[colorScheme][day.contributionLevel]}
                height={cardWidth / 76}
                // ref={ref}
                key={day.date}
                rx="2"
                ry="2"
                width={cardWidth / 76}
                x={50 + (index * cardWidth) / 55.5}
                y={30 + day.weekday * 20}
              >
                <title>
                  {day.contributionCount > 0
                    ? day.contributionCount + " contributions on " + day.date
                    : "No contributions"}
                </title>
              </rect>
            ))
          )}
        </svg>
      ) : (
        <Loader />
      )}
    </Card>
  );
}

export { Contributions };
