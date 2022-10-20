import { Card, Group, Text, Title, useMantineTheme } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { guestUser } from "../../../../utils/data";
import { getMonth } from "../../helpers/formatDates";
import { getColorGuest } from "../../helpers/getColor";
import { WEEK_LABELS } from "../../hooks/useContributions";
import { useStyles } from "./Contributions.styles";

function ContributionsGuest() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [cardWidth, setCardWidth] = useState(1078);
  const { ref, width } = useElementSize();

  const CONTRIBUTION_LEVELS = [
    "NONE",
    "FIRST_QUARTILE",
    "SECOND_QUARTILE",
    "THIRD_QUARTILE",
    "FOURTH_QUARTILE",
  ];
  const weeks = Array.from(Array(53).keys());
  const TOTAL_WEEKS = [3, 7, 11, 16, 20, 24, 28, 33, 37, 42, 46, 50, 53];
  const MONTHS = [
    "NOV",
    "DEC",
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
  ];

  useEffect(() => {
    if (width) {
      setCardWidth(width);
    }
  }, [width]);

  const getRandomContribution = () => {
    const levels = [
      "NONE",
      "FIRST_QUARTILE",
      "SECOND_QUARTILE",
      "THIRD_QUARTILE",
      "FOURTH_QUARTILE",
    ];

    return levels[Math.floor(Math.random() * levels.length)];
  };

  const getMonthPosition = (
    index: number,
    cardWidth: number,
    spacing: number
  ) => {
    const weekWidth = cardWidth / spacing;
    const monthPosition = TOTAL_WEEKS[index] * weekWidth;

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

  return (
    <Card withBorder className={classes.card} p="lg" radius="md" ref={ref}>
      <Title pb={25} size={18}>
        Total contributions
      </Title>
      <svg width={"100%"}>
        {MONTHS.map(
          (month, index) =>
            index < 12 && (
              <text
                fill={theme.colors.gray[4]}
                key={index}
                x={getMonthPosition(index, cardWidth, 55 + 1200 / cardWidth)}
                y={16}
              >
                {getMonth(index)}
              </text>
            )
        )}
        {WEEK_LABELS.map((label, index) => (
          <text
            fill={theme.colors.gray[4]}
            key={index}
            x={0}
            y={64 + 40 * index}
          >
            {label}
          </text>
        ))}
        {weeks?.map((week, index) =>
          guestUser.stats.contributions.weekData.contributionDays.map((day) => (
            <rect
              fill={getColorGuest(getRandomContribution(), theme)}
              height={cardWidth / 76}
              key={day.date}
              rx="2"
              ry="2"
              width={cardWidth / 76}
              x={50 + (index * cardWidth) / (55 + 1200 / cardWidth)}
              y={30 + day.weekday * 20}
            ></rect>
          ))
        )}
      </svg>
      <Group mr={10} mt={15} position="right">
        <Text color="gray" size="md">
          Less
        </Text>
        <Group spacing={10}>
          {CONTRIBUTION_LEVELS.map((level, index) => (
            <div
              className={classes.swatches}
              key={level + index}
              style={{
                backgroundColor: getColorGuest(level, theme),
              }}
            />
          ))}
        </Group>
        <Text color="gray" size="md">
          More
        </Text>
      </Group>
    </Card>
  );
}

export { ContributionsGuest };
