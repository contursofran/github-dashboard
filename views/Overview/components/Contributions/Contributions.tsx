import {
  Card,
  Group,
  Skeleton,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { ContributionCalendarMonth } from "../../types/github";
import { getMonth, getShortDate } from "../../utils/formatDates";
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

  // TODO: fix month position
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
    return (
      <Card withBorder className={classes.card} p="lg" radius="md" ref={ref}>
        <Group sx={{ height: "100%", width: "100%" }}>
          <Stack
            justify="center"
            pt={"3%"}
            sx={{ height: "100%", width: "5%" }}
          >
            <Skeleton height={20} width={"100%"} />
            <Skeleton height={20} width={"100%"} />
            <Skeleton height={20} width={"100%"} />
          </Stack>
          <Stack sx={{ height: "100%", width: "93%" }}>
            <Skeleton height={25} width={"100%"} />
            <Skeleton height={"100%"} width={"100%"} />
          </Stack>
        </Group>
      </Card>
    );
  }

  return (
    <Card withBorder className={classes.card} p="lg" radius="md" ref={ref}>
      <Title pb={"lg"} size={18}>
        Total contributions
      </Title>
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
              fill={calendarColors.blue[colorScheme][day.contributionLevel]}
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
    </Card>
  );
}

export { Contributions };
