import { Card, useMantineTheme } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { ContributionCalendarMonth } from "../../../../types/github";
import { trpc } from "../../../../utils/trpc";
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
    console.log(width);
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
    const weekWidth = cardWidth / 53;
    const weekOffset = weekWidth;
    const monthPosition = weekOffset + (totalWeeks[index] - 1) * weekWidth;

    if (monthPosition === 0) {
      return 21;
    }

    return monthPosition;
  };

  return (
    <Card withBorder className={classes.card} p="lg" radius="md" ref={ref}>
      <svg height={"100%"} width={"100%"}>
        {monthData?.map((month, index) => (
          <text
            fill={colors.gray[4]}
            key={index}
            x={getMonthPosition(index)}
            y={18}
          >
            {getMonth(index)}
          </text>
        ))}

        {weekData?.map((week, index) =>
          week.contributionDays.map((day) => (
            <rect
              fill={calendarColors[colorScheme][day.contributionLevel]}
              height={cardWidth / 75}
              key={day.date}
              rx="2"
              ry="2"
              width={cardWidth / 75}
              x={3 + (index * cardWidth) / 53}
              y={30 + day.weekday * 20}
            ></rect>
          ))
        )}
      </svg>
    </Card>
  );
}

export { Contributions };
